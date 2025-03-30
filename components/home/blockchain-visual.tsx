"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function BlockchainVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <NetworkGraph />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);

  // Create nodes and connections
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear previous objects
    while (groupRef.current.children.length > 0) {
      groupRef.current.remove(groupRef.current.children[0]);
    }

    nodesRef.current = [];
    linesRef.current = [];

    // Create nodes
    const nodeCount = 15;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const position = new THREE.Vector3(x, y, z);
      nodes.push(position);

      // Create node mesh
      const geometry = new THREE.SphereGeometry(
        0.05 + Math.random() * 0.05,
        16,
        16
      );
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x00f3ff : 0xbc00ff,
        emissive: Math.random() > 0.5 ? 0x00f3ff : 0xbc00ff,
        emissiveIntensity: 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      groupRef.current.add(mesh);
      nodesRef.current.push(mesh);
    }

    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      const connections = 1 + Math.floor(Math.random() * 3); // 1-3 connections per node

      for (let j = 0; j < connections; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i],
            nodes[targetIndex],
          ]);

          const lineMaterial = new THREE.LineBasicMaterial({
            color: Math.random() > 0.5 ? 0x00f3ff : 0xbc00ff,
            transparent: true,
            opacity: 0.3,
          });

          const line = new THREE.Line(lineGeometry, lineMaterial);
          groupRef.current.add(line);
          linesRef.current.push(line);
        }
      }
    }
  }, []);

  // Animate nodes and lines
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Animate nodes
    nodesRef.current.forEach((node, i) => {
      node.scale.setScalar(0.8 + Math.sin(time * 0.5 + i) * 0.2);

      // Slight position movement
      node.position.x += Math.sin(time * 0.2 + i) * 0.001;
      node.position.y += Math.cos(time * 0.2 + i) * 0.001;
      node.position.z += Math.sin(time * 0.2 + i * 0.5) * 0.001;
    });

    // Animate lines opacity
    linesRef.current.forEach((line, i) => {
      const material = line.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(time * 0.3 + i) * 0.1;
    });
  });

  return <group ref={groupRef} />;
}
