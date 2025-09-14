export interface Job {
  id: string
  title: string
  company: string
  location: string
  matchPercentage: number
  salary?: string
  postedAgo: string
  jobType: string
  workMode: string
  description: string
  requirements: string[]
  matchedSkills: string[]
  gapSkills: string[]
  seniority: string
}

export interface Alert {
  id: string
  name: string
  keywords: string[]
  jobType: string
  workMode: string
  salary?: string
  location?: string
  postedWithin: string
  matchCount: number
  isActive: boolean
}

export interface ApplicationStatus {
  id: string
  jobId: string
  status: "applied" | "reviewing" | "interview" | "offer" | "rejected"
  appliedDate: string
  lastUpdate: string
  notes?: string
}

export interface AdminMetrics {
  totalUsers: number
  activeUsers: number
  totalJobs: number
  newJobsToday: number
  totalApplications: number
  successRate: number
  avgMatchScore: number
}

export interface UserData {
  id: string
  name: string
  email: string
  joinDate: string
  lastActive: string
  alertsCount: number
  applicationsCount: number
  status: "active" | "inactive" | "suspended"
}

export interface JobSource {
  id: string
  name: string
  url: string
  status: "active" | "inactive" | "error"
  jobsScraped: number
  lastSync: string
  successRate: number
}

export const mockAlerts: Alert[] = [
  {
    id: "1",
    name: "Senior React Developer",
    keywords: ["React", "TypeScript", "Node.js"],
    jobType: "Full-time",
    workMode: "Remote",
    salary: "$120k - $180k",
    location: "San Francisco, CA",
    postedWithin: "1 week",
    matchCount: 12,
    isActive: true,
  },
  {
    id: "2",
    name: "Product Manager - AI",
    keywords: ["Product Management", "AI", "Machine Learning"],
    jobType: "Full-time",
    workMode: "Hybrid",
    salary: "$140k - $200k",
    location: "New York, NY",
    postedWithin: "3 days",
    matchCount: 8,
    isActive: true,
  },
  {
    id: "3",
    name: "DevOps Engineer",
    keywords: ["AWS", "Docker", "Kubernetes"],
    jobType: "Full-time",
    workMode: "Remote",
    salary: "$110k - $160k",
    postedWithin: "1 month",
    matchCount: 5,
    isActive: false,
  },
]

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechFlow Inc",
    location: "San Francisco, CA",
    matchPercentage: 92,
    salary: "$140k - $180k",
    postedAgo: "2d ago",
    jobType: "Full-time",
    workMode: "Remote",
    seniority: "Senior Level",
    description:
      "We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of our platform.",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript skills",
      "Experience with modern build tools",
      "Knowledge of testing frameworks",
      "Excellent communication skills",
    ],
    matchedSkills: ["React", "TypeScript", "JavaScript", "CSS", "Git", "Jest"],
    gapSkills: ["GraphQL", "Next.js", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "DataVision Labs",
    location: "New York, NY",
    matchPercentage: 87,
    salary: "$120k - $160k",
    postedAgo: "1d ago",
    jobType: "Full-time",
    workMode: "Hybrid",
    seniority: "Mid Level",
    description: "Join our team to build scalable web applications that process millions of data points daily.",
    requirements: [
      "3+ years full-stack development",
      "React and Node.js experience",
      "Database design skills",
      "API development experience",
      "Agile methodology experience",
    ],
    matchedSkills: ["React", "Node.js", "JavaScript", "PostgreSQL", "REST APIs"],
    gapSkills: ["Redis", "Docker", "AWS"],
  },
  {
    id: "3",
    title: "React Native Developer",
    company: "MobileFirst Solutions",
    location: "Austin, TX",
    matchPercentage: 78,
    salary: "$100k - $140k",
    postedAgo: "3d ago",
    jobType: "Full-time",
    workMode: "On-site",
    seniority: "Mid Level",
    description: "Build beautiful mobile applications that delight users and drive business growth.",
    requirements: [
      "React Native experience",
      "Mobile app development",
      "iOS/Android deployment",
      "State management (Redux/Context)",
      "Performance optimization",
    ],
    matchedSkills: ["React", "JavaScript", "Git", "Redux"],
    gapSkills: ["React Native", "iOS Development", "Android Development"],
  },
  {
    id: "4",
    title: "Frontend Team Lead",
    company: "InnovateTech",
    location: "Seattle, WA",
    matchPercentage: 85,
    salary: "$160k - $200k",
    postedAgo: "1w ago",
    jobType: "Full-time",
    workMode: "Remote",
    seniority: "Lead/Principal",
    description:
      "Lead a team of frontend developers while contributing to architecture decisions and mentoring junior developers.",
    requirements: [
      "7+ years frontend development",
      "Team leadership experience",
      "Architecture design skills",
      "Mentoring experience",
      "Strong technical communication",
    ],
    matchedSkills: ["React", "TypeScript", "JavaScript", "Leadership", "Mentoring"],
    gapSkills: ["System Design", "Performance Monitoring", "Team Management"],
  },
]

export const mockBookmarkedJobs = mockJobs.slice(0, 3)

export const mockApplications: ApplicationStatus[] = [
  {
    id: "1",
    jobId: "1",
    status: "interview",
    appliedDate: "2024-01-15",
    lastUpdate: "2024-01-20",
    notes: "Technical interview scheduled for next week",
  },
  {
    id: "2",
    jobId: "2",
    status: "reviewing",
    appliedDate: "2024-01-18",
    lastUpdate: "2024-01-18",
  },
  {
    id: "3",
    jobId: "4",
    status: "applied",
    appliedDate: "2024-01-22",
    lastUpdate: "2024-01-22",
    notes: "Submitted through company website",
  },
]

export const mockAdminMetrics: AdminMetrics = {
  totalUsers: 12847,
  activeUsers: 8932,
  totalJobs: 45621,
  newJobsToday: 234,
  totalApplications: 3421,
  successRate: 23.4,
  avgMatchScore: 78.5,
}

export const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    joinDate: "2024-01-15",
    lastActive: "2024-01-25",
    alertsCount: 3,
    applicationsCount: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    joinDate: "2024-01-10",
    lastActive: "2024-01-24",
    alertsCount: 5,
    applicationsCount: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    joinDate: "2024-01-08",
    lastActive: "2024-01-20",
    alertsCount: 2,
    applicationsCount: 15,
    status: "inactive",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    joinDate: "2024-01-12",
    lastActive: "2024-01-25",
    alertsCount: 4,
    applicationsCount: 6,
    status: "active",
  },
]

export const mockJobSources: JobSource[] = [
  {
    id: "1",
    name: "LinkedIn Jobs",
    url: "https://linkedin.com/jobs",
    status: "active",
    jobsScraped: 15420,
    lastSync: "2024-01-25T10:30:00Z",
    successRate: 98.5,
  },
  {
    id: "2",
    name: "Indeed",
    url: "https://indeed.com",
    status: "active",
    jobsScraped: 12340,
    lastSync: "2024-01-25T10:15:00Z",
    successRate: 96.2,
  },
  {
    id: "3",
    name: "AngelList",
    url: "https://angel.co/jobs",
    status: "error",
    jobsScraped: 3420,
    lastSync: "2024-01-24T15:20:00Z",
    successRate: 87.3,
  },
  {
    id: "4",
    name: "Glassdoor",
    url: "https://glassdoor.com/jobs",
    status: "active",
    jobsScraped: 8940,
    lastSync: "2024-01-25T09:45:00Z",
    successRate: 94.1,
  },
]

export const mockAnalyticsData = {
  userGrowth: [
    { month: "Aug", users: 8420 },
    { month: "Sep", users: 9230 },
    { month: "Oct", users: 10150 },
    { month: "Nov", users: 11200 },
    { month: "Dec", users: 12100 },
    { month: "Jan", users: 12847 },
  ],
  applicationTrends: [
    { week: "Week 1", applications: 245 },
    { week: "Week 2", applications: 312 },
    { week: "Week 3", applications: 289 },
    { week: "Week 4", applications: 356 },
  ],
  topSkills: [
    { skill: "React", count: 2340 },
    { skill: "TypeScript", count: 1890 },
    { skill: "Node.js", count: 1650 },
    { skill: "Python", count: 1420 },
    { skill: "AWS", count: 1230 },
  ],
}
