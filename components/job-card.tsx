"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react"
import { MatchRing } from "./match-ring"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  matchPercentage: number
  salary?: string
  postedAgo: string
  jobType: string
  workMode: string
  isBookmarked?: boolean
  onBookmark?: (id: string) => void
}

export function JobCard({
  id,
  title,
  company,
  location,
  matchPercentage,
  salary,
  postedAgo,
  jobType,
  workMode,
  isBookmarked = false,
  onBookmark,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="glass glass-hover p-6 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground font-medium">{company}</p>
          </div>
          <div className="flex items-center space-x-3">
            <MatchRing percentage={matchPercentage} size={48} />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onBookmark?.(id)
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {jobType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {workMode}
          </Badge>
          {salary && (
            <Badge variant="outline" className="text-xs">
              <DollarSign className="h-3 w-3 mr-1" />
              {salary}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {postedAgo}
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">{matchPercentage}% Match</Badge>
        </div>
      </Card>
    </motion.div>
  )
}
