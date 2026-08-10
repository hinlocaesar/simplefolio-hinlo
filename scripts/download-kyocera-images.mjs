import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../src/assets/project-images/kyocera");

const assets = [
  {
    name: "ecosys-fs1125mfp.jpg",
    url: "https://www.kyoceradocumentsolutions.com/asia/en/products/mfp/ecosys-fs1125mfp/assets/images/ecosys-fs-1125mfp.jpg",
  },
  {
    name: "taskalfa-2201.jpg",
    url: "https://www.kyoceradocumentsolutions.com/hk/en/products/mfp/taskalfa-2201/assets/images/taskalfa-2201.jpg",
  },
  {
    name: "ecosys-m3860idnf.jpg",
    url: "https://www.kyoceradocumentsolutions.com/asia/en/products/mfp/ecosys-m3860idnf/assets/images/ecosys-m3860idnf.jpg",
  },
];

await mkdir(outDir, { recursive: true });

for (const asset of assets) {
  const response = await fetch(asset.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${asset.url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outDir, asset.name), buffer);
  console.log(`Saved ${asset.name}`);
}
