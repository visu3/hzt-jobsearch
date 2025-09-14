"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

interface AlertCardProps {
  id: string
  name: string
  keywords: string[]
  jobType: string
  workMode: string
  salary?: string
  location?: string
  postedWithin: string
  matchCount: number
  isActive: boolean
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export function AlertCard({
  id,
  name,
  keywords,
  jobType,
  workMode,
  salary,
  location,
  postedWithin,
  matchCount,
  isActive,
  onToggle,
  onDelete,
}: AlertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Card className="glass glass-hover p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
            >
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{matchCount} new matches</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle?.(id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap gap-1">
            {keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {keywords.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{keywords.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{jobType}</span>
            <span>•</span>
            <span>{workMode}</span>
            {salary && (
              <>
                <span>•</span>
                <span>{salary}</span>
              </>
            )}
            {location && (
              <>
                <span>•</span>
                <span>{location}</span>
              </>
            )}
            <span>•</span>
            <span>Posted within {postedWithin}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Paused"}</Badge>

          <Link href={`/alerts/${id}/jobs`}>
            <Button variant="outline" size="sm">
              View Jobs
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
