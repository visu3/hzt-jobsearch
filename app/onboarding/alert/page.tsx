"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, DollarSign, Clock, Briefcase } from "lucide-react"
import Link from "next/link"

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]
const workModes = ["Remote", "Hybrid", "On-site"]
const seniorityLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead/Principal", "Executive"]
const postedWithinOptions = ["1 day", "3 days", "1 week", "2 weeks", "1 month", "3 months", "6 months"]

const popularKeywords = [
  "React",
  "JavaScript",
  "Python",
  "Node.js",
  "TypeScript",
  "AWS",
  "Docker",
  "Machine Learning",
  "Data Science",
  "Product Manager",
  "UX Designer",
  "DevOps",
  "Full Stack",
  "Frontend",
  "Backend",
]

export default function AlertCreationPage() {
  const [alertName, setAlertName] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [jobType, setJobType] = useState<string[]>([])
  const [workMode, setWorkMode] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([50000, 150000])
  const [location, setLocation] = useState("")
  const [seniority, setSeniority] = useState("")
  const [postedWithin, setPostedWithin] = useState("1 month")

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords((prev) => [...prev, keyword.trim()])
      setKeywordInput("")

      // Auto-generate alert name if empty
      if (!alertName && keywords.length === 0) {
        setAlertName(`${keyword.trim()} Jobs`)
      }
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword))
  }

  const toggleJobType = (type: string) => {
    setJobType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleWorkMode = (mode: string) => {
    setWorkMode((prev) => (prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]))
  }

  const handleCreateAlert = () => {
    // In a real app, this would save the alert and redirect
    window.location.href = "/home"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <ProgressIndicator steps={["Upload Resume", "Create Alert", "Complete"]} currentStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your First Job Alert</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Set up personalized alerts to get notified when jobs matching your criteria are posted
          </p>
        </motion.div>

        <Card className="glass p-8">
          <div className="space-y-8">
            {/* Alert Name */}
            <div className="space-y-2">
              <Label htmlFor="alertName">Alert Name</Label>
              <Input
                id="alertName"
                placeholder="e.g., Senior React Developer Jobs"
                value={alertName}
                onChange={(e) => setAlertName(e.target.value)}
              />
            </div>

            {/* Keywords */}
            <div className="space-y-4">
              <Label>Keywords & Skills</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keywords, skills, or job titles..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addKeyword(keywordInput)}
                  />
                  <Button onClick={() => addKeyword(keywordInput)} disabled={!keywordInput.trim()}>
                    Add
                  </Button>
                </div>

                {/* Popular Keywords */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Popular keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => addKeyword(keyword)}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Selected Keywords */}
                {keywords.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Selected keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                          {keyword} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Type
              </Label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={jobType.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleJobType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="space-y-3">
              <Label>Work Mode</Label>
              <div className="flex flex-wrap gap-2">
                {workModes.map((mode) => (
                  <Badge
                    key={mode}
                    variant={workMode.includes(mode) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleWorkMode(mode)}
                  >
                    {mode}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Salary Range (USD)
              </Label>
              <div className="px-4">
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  max={300000}
                  min={30000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${salaryRange[0].toLocaleString()}</span>
                  <span>${salaryRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Seniority */}
            <div className="space-y-2">
              <Label>Seniority Level</Label>
              <Select value={seniority} onValueChange={setSeniority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seniority level" />
                </SelectTrigger>
                <SelectContent>
                  {seniorityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Posted Within */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Posted Within
              </Label>
              <Select value={postedWithin} onValueChange={setPostedWithin}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {postedWithinOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mt-8"
        >
          <Link href="/onboarding/resume">
            <Button variant="outline">Back</Button>
          </Link>

          <Button onClick={handleCreateAlert} disabled={keywords.length === 0 || !alertName.trim()}>
            Create Alert & Continue
            <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
