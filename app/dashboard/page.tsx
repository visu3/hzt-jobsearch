"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  BookOpen, 
  Briefcase, 
  Settings, 
  User,
  ArrowRight,
  Clock,
  MapPin,
  DollarSign,
  Star,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

// Mock data for articles and jobs
const mockArticles = [
  {
    id: "1",
    title: "Advanced React Patterns for Modern Applications",
    excerpt: "Learn about compound components, render props, and custom hooks to build more maintainable React applications.",
    skills: ["React", "JavaScript", "Frontend"],
    source: "React Blog",
    readTime: "8 min read",
    publishedAt: "2 days ago"
  },
  {
    id: "2", 
    title: "TypeScript Best Practices for Enterprise Development",
    excerpt: "Discover how to leverage TypeScript's advanced features to create robust, scalable enterprise applications.",
    skills: ["TypeScript", "Enterprise", "Programming"],
    source: "TypeScript Weekly",
    readTime: "12 min read",
    publishedAt: "1 week ago"
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js and Express",
    excerpt: "A comprehensive guide to creating performant, secure APIs that can handle millions of requests.",
    skills: ["Node.js", "Express", "API", "Backend"],
    source: "Node.js Foundation",
    readTime: "15 min read",
    publishedAt: "3 days ago"
  }
]

const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    skills: ["React", "TypeScript", "Node.js"],
    postedAt: "2 hours ago",
    matchScore: 95
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time", 
    salary: "$100k - $130k",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    postedAt: "1 day ago",
    matchScore: 88
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "DesignStudio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80 - $100/hr",
    skills: ["React", "JavaScript", "CSS"],
    postedAt: "3 days ago",
    matchScore: 92
  }
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const availableSkills = ["React", "TypeScript", "Node.js", "JavaScript", "Python", "AWS", "Docker", "PostgreSQL"]

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">JobFlow</h1>
                <p className="text-sm text-muted-foreground">Welcome back!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link href="/skills">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  My Skills
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="learn" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="learn" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Learn</span>
                </TabsTrigger>
                <TabsTrigger value="grow" className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Grow</span>
                </TabsTrigger>
              </TabsList>

              {/* Learn Tab */}
              <TabsContent value="learn" className="space-y-6">
                {/* Search and Filters */}
                <Card className="glass p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search articles, tutorials, and guides..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                    
                    {/* Skills Filter */}
                    <div>
                      <p className="text-sm font-medium mb-3">Filter by Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10"
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Articles List */}
                <div className="grid gap-6">
                  {mockArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={`/articles/${article.id}`}>
                        <Card className="glass-hover p-6 cursor-pointer group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-3">
                                {article.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {article.readTime}
                                </span>
                                <span>{article.source}</span>
                                <span>{article.publishedAt}</span>
                              </div>
                            </div>
                            <motion.div
                              whileHover={{ x: 4 }}
                              className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ArrowRight className="h-5 w-5 text-primary" />
                            </motion.div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Grow Tab */}
              <TabsContent value="grow" className="space-y-6">
                {/* Search and Filters */}
                <Card className="glass p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search jobs by title, company, or skills..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                    
                    {/* Job Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Job Type:</p>
                        <div className="flex space-x-2">
                          {["Full-time", "Part-time", "Contract"].map((type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Salary Range:</p>
                        <div className="flex space-x-2">
                          {["$50k+", "$100k+", "$150k+"].map((range) => (
                            <Badge
                              key={range}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10"
                            >
                              {range}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {availableSkills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill}
                              variant={selectedSkills.includes(skill) ? "default" : "outline"}
                              className="cursor-pointer hover:bg-primary/10 text-xs"
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Jobs List */}
                <div className="grid gap-6">
                  {mockJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={`/jobs/${job.id}`}>
                        <Card className="glass-hover p-6 cursor-pointer group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="flex items-center space-x-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm font-medium text-success">{job.matchScore}% match</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {job.type}
                                </Badge>
                              </div>
                              
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {job.company}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.location}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {job.salary}
                                </span>
                                <span>{job.postedAt}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-4">
                                {job.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2 ml-4">
                              <motion.div
                                whileHover={{ x: 4 }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ArrowRight className="h-5 w-5 text-primary" />
                              </motion.div>
                              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
