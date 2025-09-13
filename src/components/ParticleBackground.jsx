import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Optimized Particle System - reduced particles, optimized animations
const ParticleBackground = React.memo(() => {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 15 + 10
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden will-change-transform">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [particle.opacity, 0.6, particle.opacity],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
});

export default ParticleBackground;
