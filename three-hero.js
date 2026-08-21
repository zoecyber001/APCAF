/**
 * APCAF Three.js 3D Holographic Security Shield & Orbital Radar
 * High-performance WebGL 3D visualization rendered seamlessly without clipping
 * Supports Dynamic Theme Switching & Respects prefers-reduced-motion
 */

function initThreeHero() {
  const container = document.getElementById("threeCanvasContainer");
  if (!container || typeof THREE === "undefined") return;

  const width = container.clientWidth || 480;
  const height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.z = 8.6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // 1. Core Polyhedral Wireframe Shield (Outer Icosahedron)
  const shieldGeo = new THREE.IcosahedronGeometry(1.85, 2);
  const shieldMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  scene.add(shieldMesh);

  // 2. Inner Holographic Core (Octahedron)
  const coreGeo = new THREE.OctahedronGeometry(1.05, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // 3. Concentric Orbital Scan Rings
  const ringGeo1 = new THREE.RingGeometry(2.3, 2.34, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x52525b,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.rotation.x = Math.PI / 3;
  scene.add(ringMesh1);

  const ringGeo2 = new THREE.RingGeometry(2.7, 2.74, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.y = Math.PI / 4;
  ringMesh2.rotation.x = -Math.PI / 6;
  scene.add(ringMesh2);

  // 4. Floating Particle Cloud
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 2.1 + Math.random() * 1.3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = radius * Math.cos(phi);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.075,
    transparent: true,
    opacity: 0.6
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 5. Dynamic Theme Material Synchronizer
  function syncThemeMaterials(theme) {
    const isLight = (theme === 'light' || (!theme && document.documentElement.getAttribute('data-theme') === 'light'));
    if (isLight) {
      shieldMat.color.setHex(0x18181b);
      shieldMat.opacity = 0.35;
      coreMat.color.setHex(0x09090b);
      coreMat.opacity = 0.65;
      ringMat1.color.setHex(0x27272a);
      ringMat2.color.setHex(0x0284c7);
      particleMat.color.setHex(0x09090b);
      particleMat.opacity = 0.55;
    } else {
      shieldMat.color.setHex(0x38bdf8);
      shieldMat.opacity = 0.45;
      coreMat.color.setHex(0xffffff);
      coreMat.opacity = 0.8;
      ringMat1.color.setHex(0x52525b);
      ringMat2.color.setHex(0x38bdf8);
      particleMat.color.setHex(0x38bdf8);
      particleMat.opacity = 0.6;
    }
  }

  syncThemeMaterials(document.documentElement.getAttribute('data-theme') || 'dark');
  window.addEventListener('apcaf:themeChanged', (e) => {
    syncThemeMaterials(e.detail.resolvedTheme);
  });

  // 6. Reduced Motion Detection
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 7. Interactive Mouse Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const heroSection = document.querySelector(".hero-section") || container;
  
  heroSection.addEventListener("mousemove", (e) => {
    if (prefersReducedMotion.matches) return;
    const rect = heroSection.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  });

  heroSection.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  // 8. Animation Loop
  let clock = new THREE.Clock();

  function renderFrame() {
    if (prefersReducedMotion.matches) {
      shieldMesh.rotation.y = 0.4;
      shieldMesh.rotation.x = 0.2;
      coreMesh.rotation.y = -0.3;
      renderer.render(scene, camera);
      return;
    }

    requestAnimationFrame(renderFrame);
    const elapsedTime = clock.getElapsedTime();

    targetX += (mouseX * 0.7 - targetX) * 0.08;
    targetY += (mouseY * 0.7 - targetY) * 0.08;

    shieldMesh.rotation.y = elapsedTime * 0.22 + targetX;
    shieldMesh.rotation.x = elapsedTime * 0.16 + targetY;

    coreMesh.rotation.y = -elapsedTime * 0.42;
    coreMesh.rotation.z = elapsedTime * 0.32;

    ringMesh1.rotation.z = elapsedTime * 0.36;
    ringMesh2.rotation.z = -elapsedTime * 0.26;

    particleSystem.rotation.y = elapsedTime * 0.09;

    const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
    shieldMesh.scale.set(pulse, pulse, pulse);

    renderer.render(scene, camera);
  }

  renderFrame();

  // 9. Resize Handler
  window.addEventListener("resize", () => {
    if (!container) return;
    const newW = container.clientWidth || 480;
    const newH = container.clientHeight || 480;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
    if (prefersReducedMotion.matches) {
      renderer.render(scene, camera);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeHero);
} else {
  initThreeHero();
}

