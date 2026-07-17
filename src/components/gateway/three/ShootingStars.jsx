// src/components/gateway/three/ShootingStars.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Occasional Shooting Stars
// One meteor every 15–30 seconds. Fast streak with soft trail.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, AdditiveBlending } from "three";

const MIN_INTERVAL = 15;
const MAX_INTERVAL = 30;
const DURATION = 1.2;
const TRAIL_LENGTH = 3;

function randomOnSphere(radius) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

export default function ShootingStars() {
  const [meteor, setMeteor] = useState(null);
  const meshRef = useRef(null);
  const trailRef = useRef(null);
  const progressRef = useRef(0);
  const directionRef = useRef(new Vector3());

  useEffect(() => {
    const schedule = () => {
      const delay = (MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL)) * 1000;
      const timer = setTimeout(() => {
        const start = randomOnSphere(12);
        const end = randomOnSphere(8);
        const dir = new Vector3().subVectors(end, start).normalize();
        directionRef.current = dir;

        setMeteor({
          id: Date.now(),
          start: start.clone(),
          end: end.clone(),
        });
        progressRef.current = 0;
        schedule();
      }, delay);
      return timer;
    };

    const timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    if (!meteor || !meshRef.current) return;

    progressRef.current += delta / DURATION;

    if (progressRef.current >= 1) {
      setMeteor(null);
      return;
    }

    const t = progressRef.current;
    const currentPos = new Vector3().lerpVectors(meteor.start, meteor.end, t);
    meshRef.current.position.copy(currentPos);

    // Trail follows behind
    if (trailRef.current) {
      const trailPos = new Vector3().lerpVectors(
        meteor.start,
        meteor.end,
        Math.max(0, t - 0.08)
      );
      trailRef.current.position.copy(trailPos);
    }

    // Opacity curve: fade in quick, fade out slow
    const opacity = t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9;
    meshRef.current.material.opacity = opacity * 0.7;
    if (trailRef.current) {
      trailRef.current.material.opacity = opacity * 0.25;
    }
  });

  if (!meteor) return null;

  return (
    <group>
      {/* Trail */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}