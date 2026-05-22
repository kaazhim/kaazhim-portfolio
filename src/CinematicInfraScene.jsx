import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const focusPalette = {
  hardware: '#ffd34d',
  network: '#72bef8',
  firewall: '#ff775c',
  server: '#00afa5',
  cyber: '#8d7cff',
};

const disposeObject = (object) => {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
};

function makeShieldGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.08);
  shape.bezierCurveTo(0.5, 0.92, 0.8, 0.78, 1.03, 0.52);
  shape.bezierCurveTo(0.96, -0.28, 0.62, -0.88, 0, -1.2);
  shape.bezierCurveTo(-0.62, -0.88, -0.96, -0.28, -1.03, 0.52);
  shape.bezierCurveTo(-0.8, 0.78, -0.5, 0.92, 0, 1.08);

  return new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    depth: 0.1,
  });
}

function addServerRack(parent, accent) {
  const rack = new THREE.Group();
  const rackMaterial = new THREE.MeshStandardMaterial({
    color: '#0b1433',
    emissive: '#06133b',
    emissiveIntensity: 0.35,
    metalness: 0.62,
    roughness: 0.34,
  });
  const faceMaterial = new THREE.MeshStandardMaterial({
    color: '#10285e',
    emissive: accent,
    emissiveIntensity: 0.06,
    metalness: 0.25,
    roughness: 0.45,
  });

  for (let index = 0; index < 5; index += 1) {
    const server = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.32, 0.92), rackMaterial);
    server.position.y = index * 0.39 - 0.78;
    rack.add(server);

    const face = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.18, 0.028), faceMaterial);
    face.position.set(0, server.position.y, 0.475);
    rack.add(face);

    for (let light = 0; light < 4; light += 1) {
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 12, 12),
        new THREE.MeshBasicMaterial({ color: light % 2 === 0 ? accent : '#ffd34d' }),
      );
      led.position.set(-0.48 + light * 0.18, server.position.y + 0.01, 0.502);
      rack.add(led);
    }
  }

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(1.68, 0.14, 1.12),
    new THREE.MeshStandardMaterial({ color: '#050814', metalness: 0.4, roughness: 0.5 }),
  );
  base.position.y = -1.08;
  rack.add(base);

  parent.add(rack);
  return rack;
}

function addNetwork(parent, accent) {
  const network = new THREE.Group();
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: '#fffaf0',
    emissive: accent,
    emissiveIntensity: 0.45,
    metalness: 0.1,
    roughness: 0.28,
  });
  const cableMaterial = new THREE.MeshBasicMaterial({
    color: accent,
    opacity: 0.42,
    transparent: true,
  });

  const positions = [
    [-2.18, 0.88, 0.5],
    [2.16, 0.62, -0.24],
    [-1.72, -0.18, -1.16],
    [1.64, -0.66, 1.02],
    [-0.28, 1.55, -1.08],
    [0.42, -1.08, 1.52],
    [-2.42, -0.72, 0.04],
    [2.38, 1.16, 0.48],
  ];

  positions.forEach((position, index) => {
    const node = new THREE.Mesh(new THREE.SphereGeometry(index % 3 === 0 ? 0.095 : 0.07, 18, 18), nodeMaterial);
    node.position.set(...position);
    node.userData.phase = index * 0.75;
    network.add(node);

    const mid = new THREE.Vector3(position[0] * 0.38, position[1] * 0.25 + 0.2, position[2] * 0.38);
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.05, 0), mid, new THREE.Vector3(...position)]);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.01, 8, false), cableMaterial);
    cable.userData.phase = index * 0.3;
    network.add(cable);
  });

  parent.add(network);
  return network;
}

function addCleanPeripheralKit(parent, accent) {
  const kit = new THREE.Group();
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: '#071a3d',
    emissive: '#06133b',
    emissiveIntensity: 0.24,
    metalness: 0.36,
    roughness: 0.42,
  });
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: '#10285e',
    emissive: accent,
    emissiveIntensity: 0.18,
    metalness: 0.16,
    roughness: 0.36,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: accent,
    opacity: 0.64,
    transparent: true,
  });

  const laptop = new THREE.Group();
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.035, 0.42), darkMaterial);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.46, 0.035), screenMaterial);
  const screenGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.28), glowMaterial);
  screen.position.set(0, 0.24, -0.18);
  screen.rotation.x = -0.28;
  screenGlow.position.set(0, 0.24, -0.16);
  screenGlow.rotation.copy(screen.rotation);
  laptop.add(keyboard, screen, screenGlow);
  laptop.position.set(-1.78, -1.02, 1.02);
  laptop.rotation.set(0.04, 0.56, 0.02);
  laptop.scale.setScalar(0.9);
  kit.add(laptop);

  const router = new THREE.Group();
  const routerBody = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.18, 0.44), darkMaterial);
  router.add(routerBody);
  [-0.24, 0.24].forEach((x) => {
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 10), glowMaterial);
    antenna.position.set(x, 0.28, -0.14);
    antenna.rotation.z = x > 0 ? -0.28 : 0.28;
    router.add(antenna);
  });
  for (let index = 0; index < 3; index += 1) {
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), new THREE.MeshBasicMaterial({ color: index === 1 ? '#ffd34d' : accent }));
    led.position.set(-0.24 + index * 0.14, 0.11, 0.235);
    router.add(led);
  }
  router.position.set(1.72, -1.02, 0.8);
  router.rotation.set(0, -0.62, 0);
  kit.add(router);

  const storage = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const disk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.12, 28),
      new THREE.MeshStandardMaterial({
        color: index % 2 ? '#0b2f78' : '#10285e',
        emissive: accent,
        emissiveIntensity: 0.07,
        metalness: 0.32,
        roughness: 0.38,
      }),
    );
    disk.position.y = index * 0.13;
    storage.add(disk);
  }
  storage.position.set(-1.5, -1.08, -0.88);
  storage.rotation.set(Math.PI / 2, 0, -0.42);
  kit.add(storage);

  parent.add(kit);
  return kit;
}

function addFirewallGate(parent, accent) {
  const gate = new THREE.Group();
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.22, 1.58),
    new THREE.MeshBasicMaterial({
      color: accent,
      opacity: 0.08,
      side: THREE.DoubleSide,
      transparent: true,
    }),
  );
  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.22, 1.58)),
    new THREE.LineBasicMaterial({ color: accent, opacity: 0.62, transparent: true }),
  );
  const grid = new THREE.GridHelper(1.18, 5, accent, '#355070');
  grid.material.opacity = 0.18;
  grid.material.transparent = true;
  grid.rotation.x = Math.PI / 2;
  gate.add(plane, border, grid);
  gate.position.set(1.42, 0.08, -0.42);
  gate.rotation.set(0.04, -0.74, 0.02);
  parent.add(gate);
  return gate;
}

function addParticles(parent, count, accent) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 7.2;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 4.1;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 4.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: accent,
      depthWrite: false,
      opacity: 0.52,
      size: 0.025,
      transparent: true,
    }),
  );
  parent.add(points);
  return points;
}

export default function CinematicInfraScene({
  activeFocus = 'server',
  className = '',
  mode = 'live',
  variant = 'hero',
}) {
  const mountRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const accent = focusPalette[activeFocus] ?? focusPalette.server;
    const isHero = variant === 'hero';
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#050814', isHero ? 0.05 : 0.035);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'default',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = mode === 'hardening' ? 1.32 : 1.14;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.dataset.cinematicCanvas = variant;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
    camera.position.set(isHero ? 4.6 : 4.15, isHero ? 2.85 : 2.52, isHero ? 7.3 : 6.1);
    camera.lookAt(0, -0.05, 0);

    const ambient = new THREE.AmbientLight('#dfeeff', 1.1);
    const key = new THREE.DirectionalLight('#fffaf0', 2.2);
    key.position.set(3.8, 5.6, 4);
    const rim = new THREE.PointLight(accent, mode === 'diagnostic' ? 8 : 5.8, 12);
    rim.position.set(-2.6, 1.8, 2.2);
    const warm = new THREE.PointLight('#ffd34d', 2.8, 9);
    warm.position.set(2.4, -0.3, 2.6);
    scene.add(ambient, key, rim, warm);

    const root = new THREE.Group();
    root.rotation.x = -0.08;
    scene.add(root);

    const floor = new THREE.GridHelper(8.5, 28, accent, '#1b2d58');
    floor.position.y = -1.22;
    floor.material.opacity = 0.2;
    floor.material.transparent = true;
    root.add(floor);

    const rack = addServerRack(root, accent);
    rack.rotation.y = -0.28;

    const network = addNetwork(root, accent);
    const peripheralKit = addCleanPeripheralKit(root, accent);
    const firewallGate = addFirewallGate(root, accent);

    const shield = new THREE.Mesh(
      makeShieldGeometry(),
      new THREE.MeshStandardMaterial({
        color: '#fffaf0',
        emissive: mode === 'hardening' ? '#ff775c' : accent,
        emissiveIntensity: mode === 'hardening' ? 0.26 : 0.18,
        metalness: 0.28,
        roughness: 0.32,
        transparent: true,
        opacity: 0.94,
      }),
    );
    shield.position.set(0.9, 0.18, 0.9);
    shield.rotation.set(-0.04, -0.58, 0.02);
    shield.scale.set(0.34, 0.34, 0.34);
    root.add(shield);

    const lockBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.08, 0.04),
      new THREE.MeshBasicMaterial({ color: '#050814' }),
    );
    lockBar.position.set(0.9, 0.17, 0.95);
    lockBar.rotation.copy(shield.rotation);
    root.add(lockBar);

    const ringGroup = new THREE.Group();
    const ringColors = ['#164cf4', '#72bef8', '#ffd34d', '#ff775c'];
    ringColors.forEach((color, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6 + index * 0.2, 0.01 + index * 0.002, 8, 168),
        new THREE.MeshBasicMaterial({
          color,
          opacity: 0.24 - index * 0.03,
          transparent: true,
        }),
      );
      ring.rotation.x = Math.PI / 2.25;
      ring.rotation.z = index * 0.38;
      ringGroup.add(ring);
    });
    ringGroup.position.y = -0.12;
    root.add(ringGroup);

    const scanMaterial = new THREE.MeshBasicMaterial({
      color: mode === 'hardening' ? '#ff775c' : '#72bef8',
      depthWrite: false,
      opacity: mode === 'live' ? 0.14 : 0.24,
      transparent: true,
    });
    const scan = new THREE.Mesh(new THREE.PlaneGeometry(5.7, 0.055), scanMaterial);
    scan.position.z = 1.75;
    scan.rotation.x = -0.03;
    root.add(scan);

    const particles = addParticles(root, isHero ? 90 : 130, accent);
    const startedAt = performance.now();
    let animationFrame = 0;

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    resize();

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const motionBoost = mode === 'diagnostic' ? 1.35 : mode === 'hardening' ? 1.08 : 0.86;

      root.rotation.y = Math.sin(elapsed * 0.24) * 0.12 + pointerRef.current.x * 0.12;
      root.rotation.x = -0.08 + pointerRef.current.y * 0.045;
      rack.rotation.y = -0.28 + Math.sin(elapsed * 0.34) * 0.08;
      peripheralKit.rotation.y = Math.sin(elapsed * 0.26) * 0.05;
      firewallGate.position.y = 0.08 + Math.sin(elapsed * 0.92) * 0.035;
      firewallGate.rotation.z = 0.02 + Math.sin(elapsed * 0.48) * 0.025;
      shield.rotation.z = Math.sin(elapsed * 0.9) * 0.035;
      ringGroup.rotation.y = elapsed * 0.12 * motionBoost;
      ringGroup.rotation.z = elapsed * 0.07;
      particles.rotation.y = elapsed * 0.045 * motionBoost;
      particles.rotation.x = Math.sin(elapsed * 0.11) * 0.06;
      scan.position.y = -1.08 + ((elapsed * 0.62 * motionBoost) % 2.68);
      scan.material.opacity = (mode === 'live' ? 0.11 : 0.2) + Math.sin(elapsed * 2) * 0.04;
      rim.intensity = (mode === 'diagnostic' ? 7.4 : 5.7) + Math.sin(elapsed * 1.3) * 0.8;

      network.children.forEach((child) => {
        if (child.isMesh && child.geometry.type === 'SphereGeometry') {
          const phase = child.userData.phase ?? 0;
          const pulse = 1 + Math.sin(elapsed * 2.2 + phase) * 0.16;
          child.scale.setScalar(pulse);
        }
      });

      renderer.render(scene, camera);
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      renderer.dispose();
      disposeObject(scene);
      renderer.domElement.remove();
    };
  }, [activeFocus, mode, variant]);

  return <div className={`cinematic-scene cinematic-scene-${variant} ${className}`} ref={mountRef} />;
}
