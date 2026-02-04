"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";

// Color variants for hearts and flowers - pink pastel and soft colors
const colors = [
  "text-pink-200",
  "text-pink-300",
  "text-pink-400",
  "text-rose-200",
  "text-rose-300",
  "text-red-200",
  "text-red-300",
];

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  // Use useMemo to prevent re-creating items on each render
  const items = useMemo(() => {
    // Generate 70 items - 70% flowers, 30% hearts for MORE flowers
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: (i * 1.5) % 100,
      size: 28 + (i % 8) * 5,
      duration: 14 + (i % 8) * 2,
      delay: (i % 25) * 0.7,
      opacity: 0.2 + (i % 4) * 0.08,
      color: colors[i % colors.length],
      sway: 20 + (i % 6) * 10,
      filled: i % 2 === 0,
      // 70% flowers, 30% hearts
      isFlower: i % 10 < 7,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main layer - More Flowers than Hearts */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color}`}
          style={{
            left: `${item.x}%`,
            bottom: "-80px",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -2200],
            x: [0, item.sway, -item.sway * 0.5, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0, item.opacity, item.opacity, 0],
            scale: [0.9, 1, 1.1, 0.9],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          {item.isFlower ? (
            <Flower2
              size={item.size}
              strokeWidth={1.5}
              fill={item.filled ? "currentColor" : "none"}
            />
          ) : (
            <Heart
              size={item.size}
              strokeWidth={1.5}
              fill={item.filled ? "currentColor" : "none"}
            />
          )}
        </motion.div>
      ))}

      {/* Second layer - Large flowers */}
      {items.slice(0, 25).map((item, index) => (
        <motion.div
          key={`large-${item.id}`}
          className="absolute text-pink-200/25"
          style={{
            left: `${(item.x + 50) % 100}%`,
            bottom: "-120px",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -2500],
            x: [0, item.sway * 1.2, -item.sway * 0.8, 0],
            rotate: [0, 6, -6, 0],
            opacity: [0, 0.2, 0.2, 0],
            scale: [0.95, 1, 1.1, 0.95],
          }}
          transition={{
            duration: item.duration + 6,
            repeat: Infinity,
            delay: item.delay + 2,
            ease: "linear",
          }}
        >
          <Flower2
            size={item.size + 35}
            strokeWidth={1}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* Third layer - Extra large background flowers */}
      {items.slice(0, 18).map((item, index) => (
        <motion.div
          key={`xlarge-${item.id}`}
          className="absolute text-pink-100/20"
          style={{
            left: `${(item.x + 25) % 100}%`,
            bottom: "-150px",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -2800],
            x: [0, item.sway * 1.5, -item.sway, 0],
            rotate: [0, 4, -4, 0],
            opacity: [0, 0.15, 0.15, 0],
            scale: [0.9, 1, 1.15, 0.9],
          }}
          transition={{
            duration: item.duration + 12,
            repeat: Infinity,
            delay: item.delay + 4,
            ease: "linear",
          }}
        >
          <Flower2
            size={item.size + 55}
            strokeWidth={0.8}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}
