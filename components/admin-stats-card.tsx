"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface AdminStatsCardProps {
  title: string
  value: string | number
  change?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function AdminStatsCard({ title, value, change, icon: Icon, trend = "neutral" }: AdminStatsCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-red-400",
    neutral: "text-subtle",
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-subtle">{title}</CardTitle>
          <Icon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {change && <p className={`text-xs ${trendColors[trend]} mt-1`}>{change}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
