"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Star,
  ExternalLink,
  Bookmark,
  Share2,
  CheckCircle,
  Briefcase,
  Calendar,
  Globe,
  Mail
} from "lucide-react"
import Link from "next/link"

// Mock job data
const mockJob = {
  id: "1",
  title: "Senior React Developer",
  company: "TechCorp Inc.",
  companyLogo: "/placeholder-logo.png",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k - $150k",
  skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
  postedAt: "2 hours ago",
  matchScore: 95,
  description: `# Senior React Developer - TechCorp Inc.

## About the Role

We're looking for a Senior React Developer to join our growing engineering team. You'll be responsible for building and maintaining our core web applications using React, TypeScript, and modern web technologies.

## Key Responsibilities

- Develop and maintain high-quality React applications
- Collaborate with cross-functional teams to define, design, and ship new features
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-tested code
- Mentor junior developers and conduct code reviews
- Stay up-to-date with the latest industry trends and technologies

## Requirements

- 5+ years of experience with React and JavaScript/TypeScript
- Strong understanding of modern React patterns and best practices
- Experience with state management libraries (Redux, Zustand, or similar)
- Proficiency in HTML5, CSS3, and responsive design
- Experience with testing frameworks (Jest, React Testing Library)
- Knowledge of build tools (Webpack, Vite, or similar)
- Experience with version control (Git)
- Strong problem-solving and communication skills

## Nice to Have

- Experience with Node.js and backend development
- Knowledge of cloud platforms (AWS, Azure, or GCP)
- Experience with containerization (Docker, Kubernetes)
- Familiarity with CI/CD pipelines
- Experience with microservices architecture
- Knowledge of GraphQL

## What We Offer

- Competitive salary and equity package
- Comprehensive health, dental, and vision insurance
- 401(k) with company matching
- Flexible work arrangements and remote work options
- Professional development budget
- Generous vacation and sick leave
- Modern office space with top-notch equipment
- Team building events and company retreats

## About TechCorp Inc.

TechCorp Inc. is a leading technology company that's revolutionizing the way businesses operate. Founded in 2015, we've grown from a small startup to a company of over 500 employees across multiple offices worldwide.

Our mission is to empower businesses with innovative technology solutions that drive growth and efficiency. We're proud to serve over 10,000 customers globally and are constantly pushing the boundaries of what's possible with technology.

## Application Process

1. Submit your application with your resume and cover letter
2. Initial phone screening with our HR team
3. Technical interview with our engineering team
4. Final interview with the engineering manager
5. Reference checks and background verification
6. Job offer and onboarding

We're an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.`,
  companyDescription: `TechCorp Inc. is a leading technology company that's revolutionizing the way businesses operate. Founded in 2015, we've grown from a small startup to a company of over 500 employees across multiple offices worldwide.

Our mission is to empower businesses with innovative technology solutions that drive growth and efficiency. We're proud to serve over 10,000 customers globally and are constantly pushing the boundaries of what's possible with technology.

We offer a dynamic, fast-paced work environment where innovation and creativity are encouraged. Our team consists of talented individuals from diverse backgrounds who are passionate about technology and making a positive impact on the world.`,
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements and remote work options",
    "Professional development budget",
    "Generous vacation and sick leave",
    "Modern office space with top-notch equipment",
    "Team building events and company retreats"
  ],
  applicationUrl: "https://techcorp.com/careers/senior-react-developer",
  companyWebsite: "https://techcorp.com",
  contactEmail: "careers@techcorp.com"
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

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
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-success">{mockJob.matchScore}% match</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {mockJob.type}
                      </Badge>
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-2">{mockJob.title}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{mockJob.company}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mockJob.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {mockJob.salary}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {mockJob.postedAt}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {mockJob.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsApplied(true)}
                  disabled={isApplied}
                  size="lg"
                  className="h-12 px-8"
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-5 w-5 mr-2" />
                      Apply Now
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                  <a href={mockJob.applicationUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Apply on Company Site
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Job Description</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: mockJob.description.replace(/\n/g, '<br/>') }} />
              </div>
            </Card>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">About {mockJob.company}</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed">
                  {mockJob.companyDescription}
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company Benefits</h3>
                  <ul className="space-y-2">
                    {mockJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground mr-3" />
                      <a 
                        href={mockJob.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {mockJob.companyWebsite}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                      <a 
                        href={`mailto:${mockJob.contactEmail}`}
                        className="text-primary hover:underline"
                      >
                        {mockJob.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-muted-foreground mr-3" />
                      <span>500+ employees</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                      <span>Founded in 2015</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-muted-foreground mb-6">
                Join our team and help us build the future of technology
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => setIsApplied(true)}
                  disabled={isApplied}
                  size="lg"
                  className="h-12 px-8"
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Application Submitted
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-5 w-5 mr-2" />
                      Apply Now
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                  <a href={mockJob.applicationUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Company Website
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}