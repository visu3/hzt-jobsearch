"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { JobCard } from "@/components/job-card"
import { FilterSheet, type JobFilters } from "@/components/filter-sheet"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockJobs, mockAlerts } from "@/lib/mock-data"
import { Search, ArrowLeft, Briefcase } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AlertJobsPage() {
  const params = useParams()
  const alertId = params.id as string

  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([])
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: [],
    workModes: [],
    salaryRange: [30000, 300000],
    seniority: [],
    postedWithin: [],
  })

  const alert = mockAlerts.find((a) => a.id === alertId)

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.matchedSkills.some((skill) => skill.toLowerCase().includes(query))

        if (!matchesSearch) return false
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false
      }

      // Work mode filter
      if (filters.workModes.length > 0 && !filters.workModes.includes(job.workMode)) {
        return false
      }

      // Seniority filter
      if (filters.seniority.length > 0 && !filters.seniority.includes(job.seniority)) {
        return false
      }

      // Salary filter (basic implementation)
      if (job.salary) {
        const salaryMatch = job.salary.match(/\$(\d+)k/)
        if (salaryMatch) {
          const jobSalary = Number.parseInt(salaryMatch[1]) * 1000
          if (jobSalary < filters.salaryRange[0] || jobSalary > filters.salaryRange[1]) {
            return false
          }
        }
      }

      return true
    })
  }, [searchQuery, filters])

  const toggleBookmark = (jobId: string) => {
    setBookmarkedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <EmptyState
            title="Alert Not Found"
            description="The job alert you're looking for doesn't exist or has been removed."
            actionLabel="Back to Home"
            onAction={() => (window.location.href = "/home")}
            icon={<Briefcase className="h-16 w-16" />}
          />
        </div>
      </div>
    )
  }

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
          <div className="flex items-center mb-4">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Alerts
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{alert.name}</h1>
              <p className="text-xl text-muted-foreground">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} match your criteria
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <FilterSheet onFiltersChange={setFilters} currentFilters={filters} />
            </div>
          </div>
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
                  <JobCard {...job} isBookmarked={bookmarkedJobs.includes(job.id)} onBookmark={toggleBookmark} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Jobs Found"
            description="Try adjusting your search criteria or filters to find more opportunities."
            actionLabel="Clear Filters"
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
      </div>
    </div>
  )
}
