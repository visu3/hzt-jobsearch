"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { JobCard } from "@/components/job-card"
import { EmptyState } from "@/components/empty-state"
import { FilterSheet, type JobFilters } from "@/components/filter-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockBookmarkedJobs } from "@/lib/mock-data"
import { Search, Bookmark, Heart } from "lucide-react"
import Link from "next/link"

export default function BookmarksPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState(mockBookmarkedJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: [],
    workModes: [],
    salaryRange: [30000, 300000],
    seniority: [],
    postedWithin: [],
  })

  const removeBookmark = (jobId: string) => {
    setBookmarkedJobs((prev) => prev.filter((job) => job.id !== jobId))
  }

  const filteredJobs = bookmarkedJobs.filter((job) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)

      if (!matchesSearch) return false
    }

    if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
      return false
    }

    if (filters.workModes.length > 0 && !filters.workModes.includes(job.workMode)) {
      return false
    }

    if (filters.seniority.length > 0 && !filters.seniority.includes(job.seniority)) {
      return false
    }

    return true
  })

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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Bookmarked Jobs</h1>
              <p className="text-xl text-muted-foreground">
                {filteredJobs.length} saved job{filteredJobs.length !== 1 ? "s" : ""} for later review
              </p>
            </div>

            {bookmarkedJobs.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>
                <FilterSheet onFiltersChange={setFilters} currentFilters={filters} />
              </div>
            )}
          </div>

          {/* Stats */}
          {bookmarkedJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookmarks</p>
                    <p className="text-2xl font-bold">{bookmarkedJobs.length}</p>
                  </div>
                  <Bookmark className="h-8 w-8 text-primary" />
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
                    <p className="text-sm text-muted-foreground">Avg Match</p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        bookmarkedJobs.reduce((sum, job) => sum + job.matchPercentage, 0) / bookmarkedJobs.length,
                      )}
                      %
                    </p>
                  </div>
                  <Heart className="h-8 w-8 text-success" />
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
                    <p className="text-sm text-muted-foreground">Remote Jobs</p>
                    <p className="text-2xl font-bold">
                      {bookmarkedJobs.filter((job) => job.workMode === "Remote").length}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">🏠</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/jobs/${job.id}`}>
                  <JobCard {...job} isBookmarked={true} onBookmark={removeBookmark} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : bookmarkedJobs.length === 0 ? (
          <EmptyState
            title="No Bookmarked Jobs"
            description="Start bookmarking jobs you're interested in to keep track of opportunities you want to apply to later."
            actionLabel="Browse Jobs"
            onAction={() => (window.location.href = "/home")}
            icon={<Bookmark className="h-16 w-16" />}
          />
        ) : (
          <EmptyState
            title="No Jobs Match Your Search"
            description="Try adjusting your search criteria or filters to find your bookmarked jobs."
            actionLabel="Clear Search"
            onAction={() => {
              setSearchQuery("")
              setFilters({
                jobTypes: [],
                workModes: [],
                salaryRange: [30000, 300000],
                seniority: [],
                postedWithin: [],
              })
            }}
            icon={<Search className="h-16 w-16" />}
          />
        )}

        {/* Quick Actions */}
        {bookmarkedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Ready to take the next step?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/applied">
                  <Button variant="outline">Track Applications</Button>
                </Link>
                <Link href="/home">
                  <Button>Find More Jobs</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
