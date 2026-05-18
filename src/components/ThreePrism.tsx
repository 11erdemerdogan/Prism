import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreePrismProps {
  theme: 'light' | 'dark';
}

export const ThreePrism: React.FC<ThreePrismProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const prismRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // Aspect ratio 1 for square container
    camera.position.z = 10;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Make renderer fill its container exactly
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Create the Prism (Tetrahedron)
    const geometry = new THREE.TetrahedronGeometry(2.0, 0); // slightly larger for the hero
    
    // Create realistic glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0xffffff : 0xdddddd,
      metalness: theme === 'dark' ? 0.2 : 0.6,
      roughness: 0.05,
      transmission: 0.9, // Transparency
      ior: 1.5, // Index of refraction
      thickness: 2.0,
      transparent: true,
      side: THREE.DoubleSide
    });

    const prism = new THREE.Mesh(geometry, material);
    prism.rotation.x = Math.PI / 4;
    prism.rotation.y = Math.PI / 4;
    scene.add(prism);
    prismRef.current = prism;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(-5, 2, 2);
    dirLight.target = prism;
    scene.add(dirLight);

    // The Laser Beam (White Light entering)
    const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, 10, 8);
    beamGeometry.rotateZ(Math.PI / 2);
    const beamMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: theme === 'dark' ? 0.8 : 0.4,
      blending: THREE.AdditiveBlending
    });
    const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    lightBeam.position.set(-5, 0.2, 0);
    lightBeam.rotation.z = -0.1;
    scene.add(lightBeam);

    // 6. Spectrum Particles (The rainbow explosion)
    const particleCount = 2000;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
        const x = 0 + (Math.random() * 0.5);
        const y = (Math.random() - 0.5) * 0.5;
        const z = (Math.random() - 0.5) * 0.5;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const hue = Math.random() * 0.8;
        color.setHSL(hue, 1.0, 0.5);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 2.0;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: theme === 'dark' ? 0.8 : 0.5,
        depthWrite: false
    });

    const spectrumParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(spectrumParticles);

    // 7. Animation & Parallax Setup
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    let baseRotY = Math.PI / 4;
    let baseRotX = Math.PI / 4;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Base automatic rotation
      baseRotY += 0.002;
      baseRotX += 0.001;

      // Mouse Parallax for Rotation
      targetX = mouseX * 2.0;
      targetY = mouseY * 2.0;
      
      prism.rotation.y += 0.05 * ((baseRotY + targetX) - prism.rotation.y);
      prism.rotation.x += 0.05 * ((baseRotX + targetY) - prism.rotation.x);

      // Slight positional parallax to actually "follow" the mouse
      prism.position.x += 0.05 * (mouseX * 0.5 - prism.position.x);
      prism.position.y += 0.05 * (-mouseY * 0.5 - prism.position.y);

      // Animate Particles
      const posArray = spectrumParticles.geometry.attributes.position.array;
      for (let i = 0; i < posArray.length; i += 3) {
          posArray[i] += 0.02 + (Math.random() * 0.01);
          posArray[i + 1] += Math.sin(posArray[i] * 2) * 0.005;
          posArray[i + 2] += Math.cos(posArray[i] * 2) * 0.005;

          if (posArray[i] > 8) {
              posArray[i] = 0 + (Math.random() * 0.5);
              posArray[i + 1] = (Math.random() - 0.5) * 0.5;
              posArray[i + 2] = (Math.random() - 0.5) * 0.5;
          }
      }
      spectrumParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      beamGeometry.dispose();
      beamMaterial.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []); // Run once on mount

  // React to theme changes
  useEffect(() => {
    if (prismRef.current) {
      const material = prismRef.current.material as THREE.MeshPhysicalMaterial;
      if (theme === 'dark') {
        material.color.setHex(0xffffff);
        material.metalness = 0.2;
      } else {
        material.color.setHex(0xdddddd);
        material.metalness = 0.6;
      }
    }
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-10" 
      style={{ pointerEvents: 'none' }} // Let clicks pass through to UI underneath if necessary
    />
  );
};
