"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SkillChipProps {
  skill: string
  isSelected?: boolean
  isRemovable?: boolean
  onClick?: () => void
  onRemove?: () => void
}

export function SkillChip({ skill, isSelected = false, isRemovable = false, onClick, onRemove }: SkillChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        variant={isSelected ? "default" : "secondary"}
        className={`cursor-pointer transition-all duration-200 ${
          isRemovable ? "pr-1" : ""
        } ${onClick ? "hover:shadow-md" : ""}`}
        onClick={onClick}
      >
        {skill}
        {isRemovable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </Badge>
    </motion.div>
  )
}
