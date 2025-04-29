"use client";

import { useEffect } from 'react';
import * as THREE from 'three';

export const ThreeJSParticles = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full -z-10 opacity-30';
    document.getElementById('particles-container')?.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i+1] = (Math.random() - 0.5) * 10;
      posArray[i+2] = (Math.random() - 0.5) * 10;
      
      const color = new THREE.Color(
        Math.random() * 0.2 + 0.8,
        Math.random() * 0.2 + 0.8,
        Math.random() * 0.3 + 0.7
      );
      colorArray[i] = color.r;
      colorArray[i+1] = color.g;
      colorArray[i+2] = color.b;
      
      sizeArray[i/3] = Math.random() * 0.1 + 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(100 * 3 * 2);
    let lineIndex = 0;
    
    for (let i = 0; i < 100; i++) {
      const p1 = Math.floor(Math.random() * particlesCount);
      const p2 = Math.floor(Math.random() * particlesCount);
      
      linePositions[lineIndex++] = posArray[p1 * 3];
      linePositions[lineIndex++] = posArray[p1 * 3 + 1];
      linePositions[lineIndex++] = posArray[p1 * 3 + 2];
      
      linePositions[lineIndex++] = posArray[p2 * 3];
      linePositions[lineIndex++] = posArray[p2 * 3 + 1];
      linePositions[lineIndex++] = posArray[p2 * 3 + 2];
    }
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5555aa,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      particlesMesh.rotation.y = elapsedTime * 0.01;
      particlesMesh.rotation.x = elapsedTime * 0.005;
      
      particlesMaterial.size = 0.1 + Math.sin(elapsedTime * 0.5) * 0.02;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
};