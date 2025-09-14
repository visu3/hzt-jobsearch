"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Gift, X } from "lucide-react"

interface ApplicationStatusBadgeProps {
  status: "applied" | "reviewing" | "interview" | "offer" | "rejected"
  size?: "sm" | "md" | "lg"
}

export function ApplicationStatusBadge({ status, size = "md" }: ApplicationStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "applied":
        return {
          label: "Applied",
          variant: "secondary" as const,
          icon: <Clock className="h-3 w-3" />,
        }
      case "reviewing":
        return {
          label: "Under Review",
          variant: "default" as const,
          icon: <Calendar className="h-3 w-3" />,
        }
      case "interview":
        return {
          label: "Interview",
          variant: "default" as const,
          icon: <Calendar className="h-3 w-3" />,
          className: "bg-primary/10 text-primary border-primary/20",
        }
      case "offer":
        return {
          label: "Offer Received",
          variant: "default" as const,
          icon: <Gift className="h-3 w-3" />,
          className: "bg-success/10 text-success border-success/20",
        }
      case "rejected":
        return {
          label: "Not Selected",
          variant: "outline" as const,
          icon: <X className="h-3 w-3" />,
          className: "bg-destructive/10 text-destructive border-destructive/20",
        }
      default:
        return {
          label: "Unknown",
          variant: "outline" as const,
          icon: <Clock className="h-3 w-3" />,
        }
    }
  }

  const config = getStatusConfig(status)
  const sizeClass = size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"

  return (
    <Badge variant={config.variant} className={`${sizeClass} ${config.className || ""}`}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </Badge>
  )
}
