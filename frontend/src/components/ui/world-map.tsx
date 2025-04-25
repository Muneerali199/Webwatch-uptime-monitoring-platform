import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface WorldMapProps extends React.HTMLAttributes<HTMLDivElement> {
  dotColor?: string;
  pulseColor?: string;
  backgroundColor?: string;
}

export const WorldMap = React.forwardRef<HTMLDivElement, WorldMapProps>(
  ({ className, dotColor = "#3B82F6", pulseColor = "#60A5FA", backgroundColor = "#1F2937", ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const setCanvasSize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      };

      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      // Define map coordinates (simplified world map)
      const locations = [
        { x: 0.2, y: 0.3 },  // North America
        { x: 0.4, y: 0.4 },  // South America
        { x: 0.5, y: 0.3 },  // Europe
        { x: 0.6, y: 0.4 },  // Africa
        { x: 0.7, y: 0.3 },  // Asia
        { x: 0.8, y: 0.6 },  // Australia
      ];

      let pulseRadius = 0;
      let pulseOpacity = 0.5;

      const draw = () => {
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background if specified
        if (backgroundColor !== "transparent") {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw dots and pulses
        locations.forEach(loc => {
          const x = loc.x * canvas.width;
          const y = loc.y * canvas.height;

          // Draw pulse
          ctx.beginPath();
          ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = `${pulseColor}${Math.floor(pulseOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        });

        // Update pulse animation
        pulseRadius += 0.5;
        pulseOpacity -= 0.01;

        if (pulseRadius > 30) {
          pulseRadius = 0;
          pulseOpacity = 0.5;
        }

        requestAnimationFrame(draw);
      };

      draw();

      return () => {
        window.removeEventListener('resize', setCanvasSize);
      };
    }, [dotColor, pulseColor, backgroundColor]);

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: backgroundColor }}
        />
      </div>
    );
  }
);

WorldMap.displayName = "WorldMap";