"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter, X } from "lucide-react"

interface FilterSheetProps {
  onFiltersChange: (filters: JobFilters) => void
  currentFilters: JobFilters
}

export interface JobFilters {
  jobTypes: string[]
  workModes: string[]
  salaryRange: [number, number]
  seniority: string[]
  postedWithin: string[]
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]
const workModes = ["Remote", "Hybrid", "On-site"]
const seniorityLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead/Principal", "Executive"]
const postedWithinOptions = ["1 day", "3 days", "1 week", "2 weeks", "1 month"]

export function FilterSheet({ onFiltersChange, currentFilters }: FilterSheetProps) {
  const [filters, setFilters] = useState<JobFilters>(currentFilters)
  const [isOpen, setIsOpen] = useState(false)

  const toggleFilter = (category: keyof JobFilters, value: string) => {
    if (category === "salaryRange") return

    setFilters((prev) => ({
      ...prev,
      [category]: (prev[category] as string[]).includes(value)
        ? (prev[category] as string[]).filter((item) => item !== value)
        : [...(prev[category] as string[]), value],
    }))
  }

  const updateSalaryRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, salaryRange: range }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: JobFilters = {
      jobTypes: [],
      workModes: [],
      salaryRange: [30000, 300000],
      seniority: [],
      postedWithin: [],
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFilterCount =
    filters.jobTypes.length +
    filters.workModes.length +
    filters.seniority.length +
    filters.postedWithin.length +
    (filters.salaryRange[0] > 30000 || filters.salaryRange[1] < 300000 ? 1 : 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && <Badge className="ml-2 h-5 w-5 p-0 text-xs">{activeFilterCount}</Badge>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Job Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Job Type</Label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <Badge
                  key={type}
                  variant={filters.jobTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("jobTypes", type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Work Mode</Label>
            <div className="flex flex-wrap gap-2">
              {workModes.map((mode) => (
                <Badge
                  key={mode}
                  variant={filters.workModes.includes(mode) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("workModes", mode)}
                >
                  {mode}
                </Badge>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Salary Range (USD)</Label>
            <div className="px-2">
              <Slider
                value={filters.salaryRange}
                onValueChange={updateSalaryRange}
                max={300000}
                min={30000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.salaryRange[0].toLocaleString()}</span>
                <span>${filters.salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Seniority */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Seniority Level</Label>
            <div className="flex flex-wrap gap-2">
              {seniorityLevels.map((level) => (
                <Badge
                  key={level}
                  variant={filters.seniority.includes(level) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("seniority", level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Posted Within */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Posted Within</Label>
            <div className="flex flex-wrap gap-2">
              {postedWithinOptions.map((option) => (
                <Badge
                  key={option}
                  variant={filters.postedWithin.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("postedWithin", option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
