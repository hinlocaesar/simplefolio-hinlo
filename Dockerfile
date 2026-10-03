# syntax=docker/dockerfile:1

# Build the optimized image set into public/assets, then the Next.js build.
#
# The asset step has to run inside the image because public/assets is generated
# output, gitignored, and not present in a fresh checkout.
FROM node:22-alpine AS deps
WORKDIR /app
# `npm ci` needs the lockfile. It is gitignored in this repo, so fall back to
# `npm install` when it is absent -- the same reason .github/workflows does.
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# sharp and the Sass toolchain need their native binaries; the base image has
# them, but the libc it uses (musl) has to match what was installed above.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# The runtime image carries the standalone output plus the two directories Next.js
# deliberately leaves out of it: `public` (the generated images) and the static
# chunks referenced from the HTML.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]