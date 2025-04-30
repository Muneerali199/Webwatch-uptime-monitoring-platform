"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  regions: Array<{
    location: { lat: number; lng: number };
    label: string;
    status: "up" | "down" | "degraded";
    lastChecked?: Date;
  }>;
  userLocation?: { lat: number; lng: number };
  lineColor?: string;
  pulseIntensity?: number;
}

export function UptimeWorldMap({
  regions = [],
  userLocation,
  lineColor = "#0ea5e9",
  pulseIntensity = 1,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Create the base map
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  // Project lat/lng to SVG coordinates
  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  // Create a curved path between two points
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Status colors
  const statusColors = {
    up: "#10b981",
    down: "#ef4444",
    degraded: "#f59e0b",
  };

  // Pulsing animation for down regions
  const pulseAnimation = {
    scale: [1, 1 + 0.1 * pulseIntensity, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-xl relative font-sans overflow-hidden border dark:border-gray-800 border-gray-200">
      {/* Base map image */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      {/* Interactive SVG overlay */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Draw connections from user location to monitoring regions */}
        {userLocation &&
          regions.map((region, i) => {
            const userPoint = projectPoint(userLocation.lat, userLocation.lng);
            const regionPoint = projectPoint(region.location.lat, region.location.lng);
            
            return (
              <g key={`connection-${i}`}>
                <motion.path
                  d={createCurvedPath(userPoint, regionPoint)}
                  fill="none"
                  stroke={`url(#connection-gradient-${i})`}
                  strokeWidth={region.status === "down" ? 1.5 : 1}
                  strokeDasharray={region.status === "down" ? "5,3" : "0"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.2 * i,
                    ease: "easeOut",
                  }}
                />
                
                <defs>
                  <linearGradient 
                    id={`connection-gradient-${i}`} 
                    x1="0%" y1="0%" x2="100%" y2="0%"
                  >
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="5%" stopColor={statusColors[region.status]} stopOpacity="1" />
                    <stop offset="95%" stopColor={statusColors[region.status]} stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </g>
            );
          })}

        {/* Draw monitoring regions */}
        {regions.map((region, i) => {
          const point = projectPoint(region.location.lat, region.location.lng);
          
          return (
            <g key={`region-${i}`} className="pointer-events-auto">
              {/* Status indicator */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={region.status === "down" ? 6 : 4}
                fill={statusColors[region.status]}
                initial={{ scale: 0 }}
                animate={region.status === "down" ? pulseAnimation : { scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  delay: 0.1 * i,
                }}
              />
              
              {/* Pulsing effect for down regions */}
              {region.status === "down" && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill={statusColors.down}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: 10,
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.2 * i,
                  }}
                />
              )}
              
              {/* Region label */}
              <motion.text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fill={theme === "dark" ? "white" : "black"}
                fontSize="10"
                fontWeight="600"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 * i,
                }}
              >
                {region.label}
              </motion.text>
              
              {/* Status text */}
              <motion.text
                x={point.x}
                y={point.y + 20}
                textAnchor="middle"
                fill={statusColors[region.status]}
                fontSize="8"
                fontWeight="600"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 * i,
                }}
              >
                {region.status.toUpperCase()}
                {region.lastChecked && (
                  <tspan x={point.x} dy="10" fontSize="6" fill={theme === "dark" ? "#aaa" : "#666"}>
                    {new Date(region.lastChecked).toLocaleTimeString()}
                  </tspan>
                )}
              </motion.text>
            </g>
          );
        })}

        {/* Draw user location if provided */}
        {userLocation && (
          <g key="user-location">
            <motion.circle
              cx={projectPoint(userLocation.lat, userLocation.lng).x}
              cy={projectPoint(userLocation.lat, userLocation.lng).y}
              r="6"
              fill={lineColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            />
            <motion.circle
              cx={projectPoint(userLocation.lat, userLocation.lng).x}
              cy={projectPoint(userLocation.lat, userLocation.lng).y}
              r="6"
              fill={lineColor}
              opacity="0.5"
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.text
              x={projectPoint(userLocation.lat, userLocation.lng).x}
              y={projectPoint(userLocation.lat, userLocation.lng).y - 15}
              textAnchor="middle"
              fill={lineColor}
              fontSize="10"
              fontWeight="600"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
              }}
            >
              You
            </motion.text>
          </g>
        )}
      </svg>

      {/* Status legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 rounded-lg p-3 shadow-md border dark:border-gray-700 border-gray-200 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Degraded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span>Down</span>
        </div>
      </div>
    </div>
  );
}