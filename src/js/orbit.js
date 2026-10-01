import * as THREE from "three";

/**
 * The hero's orbital diagram: concentric rings on different axes, nodes riding
 * along them, and a lit core. It is the one WebGL surface on the page.
 *
 * Constraints that shaped this:
 *
 * - Additive blending and no post-processing. A bloom pass would look better but
 *   costs several full-screen passes; for a decorative panel that is not worth
 *   the frame time on a laptop.
 * - One Points object per ring rather than meshes per node. A few hundred
 *   sprites in a single draw call instead of a few hundred draw calls.
 * - Rendering pauses when the hero scrolls out of view, so the GPU is not busy
 *   with something nobody can see.
 * - Under prefers-reduced-motion it renders exactly one frame and stops. The
 *   scene is static rather than absent, so the layout does not shift.
 */
export default function initOrbit() {
  const canvas = document.querySelector("[data-orbit]");
  if (!canvas) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    // No WebGL (or it failed to initialise). The CSS nebula behind the hero
    // already carries the atmosphere, so silently do without the diagram.
    return;
  }

  // Cap the pixel ratio: a 3x phone screen would otherwise ask for 9x the
  // fragments of a 1x screen for no visible gain on a soft, glowing image.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 1.6, 9.2);
  camera.lookAt(0, 0, 0);

  const LIME = new THREE.Color("#d4ff3f");
  const VIOLET = new THREE.Color("#8b5cf6");
  const BLUE = new THREE.Color("#3b82f6");

  const root = new THREE.Group();
  root.rotation.set(-0.42, 0, 0.18);
  scene.add(root);

  /** A soft round sprite, drawn once and reused by every node material. */
  function dotTexture() {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.75)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /** A soft glow disc for the core. */
  function glowTexture() {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.18, "rgba(255,255,255,0.5)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  const dot = dotTexture();
  const glow = glowTexture();

  /** Unit circle in the XZ plane, as a line loop. */
  function ringGeometry(radius, segments = 160) {
    const points = [];
    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  const rings = [
    { radius: 1.5, count: 44, color: LIME, speed: 0.16, tilt: 0.0, nodeSize: 0.15 },
    { radius: 2.35, count: 58, color: VIOLET, speed: -0.11, tilt: 0.34, nodeSize: 0.13 },
    { radius: 3.15, count: 72, color: BLUE, speed: 0.075, tilt: -0.42, nodeSize: 0.115 },
  ];

  const groups = [];

  for (const spec of rings) {
    const group = new THREE.Group();
    group.rotation.x = spec.tilt;
    root.add(group);

    const ring = new THREE.LineLoop(
      ringGeometry(spec.radius),
      new THREE.LineBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    group.add(ring);

    // Nodes are one Points object per ring: a single draw call for all of them.
    const positions = new Float32Array(spec.count * 3);
    const phases = new Float32Array(spec.count);
    const heights = new Float32Array(spec.count);
    const colors = new Float32Array(spec.count * 3);
    const tint = spec.color.clone();

    for (let i = 0; i < spec.count; i += 1) {
      phases[i] = (i / spec.count) * Math.PI * 2 + Math.random() * 0.12;
      // A small vertical jitter so the nodes read as a shell rather than a
      // perfectly flat wire.
      heights[i] = (Math.random() - 0.5) * 0.34;
      // Vary each node slightly toward white so the ring is not one flat hue.
      const shade = tint.clone().lerp(new THREE.Color("#ffffff"), Math.random() * 0.45);
      colors[i * 3] = shade.r;
      colors[i * 3 + 1] = shade.g;
      colors[i * 3 + 2] = shade.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const nodes = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: spec.nodeSize,
        map: dot,
        transparent: true,
        opacity: 0.95,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      })
    );
    group.add(nodes);

    groups.push({ group, spec, positions, phases, heights, nodes });
  }

  // Constellation lines: each node tied to the one a fixed distance ahead on
  // the same ring, computed once in the ring's own space so they rotate with it.
  for (const entry of groups) {
    const { spec, phases, heights } = entry;
    const segments = [];
    for (let i = 0; i < spec.count; i += 1) {
      if (Math.random() > 0.22) continue;
      const j = (i + 5) % spec.count;
      const a = phases[i];
      const b = phases[j];
      segments.push(
        Math.cos(a) * spec.radius,
        heights[i],
        Math.sin(a) * spec.radius,
        Math.cos(b) * spec.radius,
        heights[j],
        Math.sin(b) * spec.radius
      );
    }
    if (!segments.length) continue;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    const lines = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    entry.group.add(lines);
  }

  // Core: a small solid sphere with a much larger additive glow behind it.
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 24, 24),
    new THREE.MeshBasicMaterial({ color: "#eaffb0" })
  );
  root.add(core);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glow,
      color: LIME,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  halo.scale.setScalar(4.2);
  root.add(halo);

  const innerHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glow,
      color: VIOLET,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  innerHalo.scale.setScalar(7.5);
  root.add(innerHalo);

  const clock = new THREE.Clock();

  function update(elapsed) {
    for (const entry of groups) {
      const { spec, positions, phases, heights } = entry;
      const angle = elapsed * spec.speed;
      for (let i = 0; i < spec.count; i += 1) {
        const a = phases[i] + angle;
        positions[i * 3] = Math.cos(a) * spec.radius;
        positions[i * 3 + 1] = heights[i] + Math.sin(elapsed * 0.6 + i) * 0.05;
        positions[i * 3 + 2] = Math.sin(a) * spec.radius;
      }
      entry.nodes.geometry.attributes.position.needsUpdate = true;
    }

    // A slow breathing pulse on the core, and a gentle drift of the whole rig.
    const pulse = 1 + Math.sin(elapsed * 1.1) * 0.08;
    core.scale.setScalar(pulse);
    halo.scale.setScalar(4.2 * pulse);
    root.rotation.y = elapsed * 0.045;
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Pull the camera back on narrow viewports so the outer ring stays in frame
    // instead of being cropped by a tall, narrow aspect.
    camera.position.z = width < 520 ? 11.5 : 9.2;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reduced) {
    // One static frame: the diagram is still there, it just does not move.
    update(6);
    renderer.render(scene, camera);
    return;
  }

  // Pause when the hero is off screen.
  let visible = true;
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);
  }

  let frame = 0;
  function loop() {
    frame = requestAnimationFrame(loop);
    if (!visible) return;
    update(clock.getElapsedTime());
    renderer.render(scene, camera);
  }

  // Touch devices are already carrying a lot of compositing work; a slow drift
  // is not worth a continuously busy GPU there.
  if (!coarse) loop();
  else {
    update(6);
    renderer.render(scene, camera);
  }

  // Release the GPU context and listeners if the page goes away.
  window.addEventListener(
    "pagehide",
    () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      dot.dispose();
      glow.dispose();
    },
    { once: true }
  );
}
