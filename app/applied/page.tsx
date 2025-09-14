"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { ApplicationStatusBadge } from "@/components/application-status-badge"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockApplications, mockJobs, type ApplicationStatus } from "@/lib/mock-data"
import { Search, Briefcase, Calendar, FileText, Plus, Edit3, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")

  const getJobDetails = (jobId: string) => {
    return mockJobs.find((job) => job.id === jobId)
  }

  const updateNotes = (applicationId: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, notes: notes.trim() || undefined } : app)),
    )
    setEditingNotes(null)
    setNoteText("")
  }

  const startEditingNotes = (application: ApplicationStatus) => {
    setEditingNotes(application.id)
    setNoteText(application.notes || "")
  }

  const filteredApplications = applications.filter((app) => {
    const job = getJobDetails(app.jobId)
    if (!job) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        app.status.toLowerCase().includes(query)

      if (!matchesSearch) return false
    }

    return true
  })

  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Application Tracker</h1>
              <p className="text-xl text-muted-foreground">
                {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""} in progress
              </p>
            </div>

            {applications.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>
                <Link href="/home">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Apply to More Jobs
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Stats */}
          {applications.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-4 rounded-2xl text-center"
              >
                <p className="text-2xl font-bold">{statusCounts.applied || 0}</p>
                <p className="text-xs text-muted-foreground">Applied</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass p-4 rounded-2xl text-center"
              >
                <p className="text-2xl font-bold">{statusCounts.reviewing || 0}</p>
                <p className="text-xs text-muted-foreground">Reviewing</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass p-4 rounded-2xl text-center"
              >
                <p className="text-2xl font-bold text-primary">{statusCounts.interview || 0}</p>
                <p className="text-xs text-muted-foreground">Interview</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass p-4 rounded-2xl text-center"
              >
                <p className="text-2xl font-bold text-success">{statusCounts.offer || 0}</p>
                <p className="text-xs text-muted-foreground">Offers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass p-4 rounded-2xl text-center"
              >
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div className="space-y-4">
            {filteredApplications.map((application, index) => {
              const job = getJobDetails(application.jobId)
              if (!job) return null

              return (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass glass-hover p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Link href={`/jobs/${job.id}`}>
                              <h3 className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer">
                                {job.title}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground font-medium">{job.company}</p>
                          </div>
                          <ApplicationStatusBadge status={application.status} />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.jobType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.workMode}
                          </Badge>
                          {job.salary && (
                            <Badge variant="outline" className="text-xs">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {job.salary}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied: {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Updated: {new Date(application.lastUpdate).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Notes</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditingNotes(application)}
                              className="text-xs"
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              {application.notes ? "Edit" : "Add Note"}
                            </Button>
                          </div>

                          {editingNotes === application.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Add notes about this application..."
                                className="min-h-20"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateNotes(application.id, noteText)}>
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingNotes(null)
                                    setNoteText("")
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">{application.notes || "No notes added yet"}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-32">
                        <Badge className="bg-primary/10 text-primary border-primary/20 justify-center">
                          {job.matchPercentage}% Match
                        </Badge>
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <FileText className="h-3 w-3 mr-1" />
                            View Job
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : applications.length === 0 ? (
          <EmptyState
            title="No Applications Yet"
            description="Start applying to jobs to track your application progress and stay organized throughout your job search."
            actionLabel="Browse Jobs"
            onAction={() => (window.location.href = "/home")}
            icon={<Briefcase className="h-16 w-16" />}
          />
        ) : (
          <EmptyState
            title="No Applications Match Your Search"
            description="Try adjusting your search criteria to find your applications."
            actionLabel="Clear Search"
            onAction={() => setSearchQuery("")}
            icon={<Search className="h-16 w-16" />}
          />
        )}
      </div>
    </div>
  )
}
