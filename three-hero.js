/**
 * APCAF Three.js 3D Holographic Security Shield & Orbital Radar
 * High-performance WebGL 3D visualization rendered seamlessly without clipping
 */

function initThreeHero() {
  const container = document.getElementById("threeCanvasContainer");
  if (!container || typeof THREE === "undefined") return;

  // 1. Scene, Camera, Renderer (alpha: true for transparent background)
  const width = container.clientWidth || 480;
  const height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  
  // Adjusted FOV and camera distance to ensure zero edge clipping during rotation
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.z = 8.6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // 2. Core Polyhedral Wireframe Shield (Outer Icosahedron)
  const shieldGeo = new THREE.IcosahedronGeometry(1.85, 2);
  const shieldMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  scene.add(shieldMesh);

  // 3. Inner Holographic Core (Octahedron)
  const coreGeo = new THREE.OctahedronGeometry(1.05, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x0ea5e9,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // 4. Concentric Orbital Scan Rings (Proportionately scaled)
  const ringGeo1 = new THREE.RingGeometry(2.3, 2.34, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.rotation.x = Math.PI / 3;
  scene.add(ringMesh1);

  const ringGeo2 = new THREE.RingGeometry(2.7, 2.74, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.y = Math.PI / 4;
  ringMesh2.rotation.x = -Math.PI / 6;
  scene.add(ringMesh2);

  // 5. Floating Particle Cloud
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
    color: 0x0284c7,
    size: 0.075,
    transparent: true,
    opacity: 0.65
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 6. Interactive Mouse & Pointer Tracking Across the Hero Area
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const heroSection = document.querySelector(".hero-section") || container;
  
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  });

  heroSection.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  // Touch tracking for mobile devices
  heroSection.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = heroSection.getBoundingClientRect();
      mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
    }
  }, { passive: true });

  heroSection.addEventListener("touchend", () => {
    mouseX = 0;
    mouseY = 0;
  });

  // 7. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth lerp mouse rotation (capped to prevent extreme tilt clipping)
    targetX += (mouseX * 0.7 - targetX) * 0.08;
    targetY += (mouseY * 0.7 - targetY) * 0.08;

    // Ambient 3D Rotation
    shieldMesh.rotation.y = elapsedTime * 0.22 + targetX;
    shieldMesh.rotation.x = elapsedTime * 0.16 + targetY;

    coreMesh.rotation.y = -elapsedTime * 0.42;
    coreMesh.rotation.z = elapsedTime * 0.32;

    ringMesh1.rotation.z = elapsedTime * 0.36;
    ringMesh2.rotation.z = -elapsedTime * 0.26;

    particleSystem.rotation.y = elapsedTime * 0.09;

    // Subtle scale breathing
    const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
    shieldMesh.scale.set(pulse, pulse, pulse);

    renderer.render(scene, camera);
  }

  animate();

  // 8. Resize Handler
  window.addEventListener("resize", () => {
    if (!container) return;
    const newW = container.clientWidth || 480;
    const newH = container.clientHeight || 480;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeHero);
} else {
  initThreeHero();
}
