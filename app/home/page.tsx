"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { AlertCard } from "@/components/alert-card"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { mockAlerts } from "@/lib/mock-data"
import { Bell, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [alerts, setAlerts] = useState(mockAlerts)

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const totalMatches = activeAlerts.reduce((sum, alert) => sum + alert.matchCount, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Job Alerts</h1>
              <p className="text-xl text-muted-foreground">
                {totalMatches > 0
                  ? `${totalMatches} new opportunities waiting for you`
                  : "Set up alerts to discover opportunities"}
              </p>
            </div>

            <Link href="/onboarding/alert">
              <Button className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {activeAlerts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-bold">{activeAlerts.length}</p>
                  </div>
                  <Bell className="h-8 w-8 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Matches</p>
                    <p className="text-2xl font-bold">{totalMatches}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">+{Math.floor(totalMatches * 0.6)}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">↗</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Alerts Grid */}
        {alerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AlertCard {...alert} onToggle={toggleAlert} onDelete={deleteAlert} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Job Alerts Yet"
            description="Create your first job alert to start receiving personalized job recommendations based on your skills and preferences."
            actionLabel="Create Your First Alert"
            onAction={() => (window.location.href = "/onboarding/alert")}
            icon={<Bell className="h-16 w-16" />}
          />
        )}

        {/* Quick Actions */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Ready to explore more opportunities?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bookmarks">
                  <Button variant="outline">View Bookmarked Jobs</Button>
                </Link>
                <Link href="/applied">
                  <Button variant="outline">Track Applications</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
