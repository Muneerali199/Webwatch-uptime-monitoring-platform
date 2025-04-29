"use client";

import React, { useState, useEffect } from 'react';

export const StarsBackground = () => {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    color: string;
    trailLength: number;
    angle: number;
    twinkleSpeed: number;
  }>>([]);

  useEffect(() => {
    const staticStars = Array.from({ length: 500 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: 0,
      opacity: Math.random() * 0.7 + 0.1,
      color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
      trailLength: 0,
      angle: 0,
      twinkleSpeed: Math.random() * 0.02 + 0.01
    }));

    const shootingStars = Array.from({ length: 20 }).map((_, i) => {
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      const speed = Math.random() * 8 + 3;
      const hue = Math.random() * 60 + 200;
      return {
        id: i + 500,
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed,
        opacity: Math.random() * 0.8 + 0.2,
        color: `hsl(${hue}, 100%, ${Math.random() * 30 + 70}%)`,
        trailLength: Math.random() * 150 + 50,
        angle,
        twinkleSpeed: 0
      };
    });

    const specialStars = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 520,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
      speed: 0,
      opacity: Math.random() * 0.9 + 0.1,
      color: `hsl(${Math.random() * 30 + 30}, 100%, ${Math.random() * 20 + 80}%)`,
      trailLength: 0,
      angle: 0,
      twinkleSpeed: Math.random() * 0.03 + 0.01
    }));

    setStars([...staticStars, ...shootingStars, ...specialStars]);

    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          let newOpacity = star.opacity;
          if (star.twinkleSpeed > 0) {
            newOpacity = star.opacity + Math.sin(Date.now() * star.twinkleSpeed) * 0.2;
            newOpacity = Math.max(0.1, Math.min(1, newOpacity));
          }
          
          if (star.speed === 0) return { ...star, opacity: newOpacity };
          
          const velocityX = Math.cos(star.angle) * star.speed;
          const velocityY = Math.sin(star.angle) * star.speed;
          
          let newX = star.x + velocityX;
          let newY = star.y + velocityY;
          
          if (
            newX < -100 || 
            newX > window.innerWidth + 100 || 
            newY > window.innerHeight + 100
          ) {
            const hue = Math.random() * 60 + 200;
            return {
              ...star,
              x: Math.random() * window.innerWidth,
              y: -50 - Math.random() * 100,
              size: Math.random() * 3 + 1,
              opacity: Math.random() * 0.8 + 0.2,
              color: `hsl(${hue}, 100%, ${Math.random() * 30 + 70}%)`,
              angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
              speed: Math.random() * 8 + 3
            };
          }
          
          return { ...star, x: newX, y: newY, opacity: newOpacity };
        })
      );
      requestAnimationFrame(animateStars);
    };
    
    const animationId = requestAnimationFrame(animateStars);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {stars.map(star => {
        if (star.speed === 0) {
          return (
            <div
              key={star.id}
              className="absolute rounded-full pointer-events-none transition-opacity duration-1000"
              style={{
                left: `${star.x}px`,
                top: `${star.y}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: star.color,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}`,
                zIndex: 1,
              }}
            />
          );
        } else {
          const velocityX = Math.cos(star.angle) * star.speed;
          const velocityY = Math.sin(star.angle) * star.speed;
          const trailAngle = Math.atan2(velocityY, velocityX);
          
          return (
            <React.Fragment key={star.id}>
              <div
                className="absolute rounded-full pointer-events-none transition-transform duration-100"
                style={{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  background: star.color,
                  opacity: star.opacity,
                  boxShadow: `0 0 ${star.size * 8}px ${star.size * 3}px ${star.color}`,
                  filter: 'blur(0.5px)',
                  zIndex: 10,
                  transform: `rotate(${star.angle}rad)`,
                  transition: 'transform 0.1s ease-out',
                }}
              />
              
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.trailLength}px`,
                  height: `${star.size * 0.7}px`,
                  background: `linear-gradient(90deg, transparent 0%, ${star.color} 30%, ${star.color} 70%, transparent 100%)`,
                  transform: `rotate(${trailAngle}rad)`,
                  transformOrigin: '0 0',
                  opacity: star.opacity * 0.8,
                  zIndex: 9,
                  filter: 'blur(1px)',
                }}
              />
            </React.Fragment>
          );
        }
      })}
    </>
  );
};