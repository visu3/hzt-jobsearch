"use client"

import { motion } from "framer-motion"

interface MatchRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
}

export function MatchRing({ percentage, size = 64, strokeWidth = 4 }: MatchRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = (percentage: number) => {
    if (percentage >= 80) return "oklch(0.75 0.15 150)" // success green
    if (percentage >= 60) return "oklch(0.65 0.15 250)" // primary blue
    if (percentage >= 40) return "oklch(0.7 0.15 60)" // warning yellow
    return "oklch(0.55 0.2 15)" // low match red
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="oklch(0.2 0.03 240)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xs font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  )
}
