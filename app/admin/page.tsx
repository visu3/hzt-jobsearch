"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Briefcase,
  TrendingUp,
  Activity,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdminStatsCard } from "@/components/admin-stats-card"
import {
  mockAdminMetrics,
  mockUsers,
  mockJobSources,
  mockAnalyticsData,
  type UserData,
  type JobSource,
} from "@/lib/mock-data"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: UserData["status"] | JobSource["status"]) => {
    const variants = {
      active: "bg-success/20 text-success border-success/30",
      inactive: "bg-subtle/20 text-subtle border-subtle/30",
      suspended: "bg-red-500/20 text-red-400 border-red-500/30",
      error: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return variants[status] || variants.inactive
  }

  const getStatusIcon = (status: JobSource["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-subtle mt-1">Manage users, jobs, and system performance</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Generate Report</Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="Total Users"
            value={mockAdminMetrics.totalUsers.toLocaleString()}
            change="+12% from last month"
            icon={Users}
            trend="up"
          />
          <AdminStatsCard
            title="Active Jobs"
            value={mockAdminMetrics.totalJobs.toLocaleString()}
            change={`+${mockAdminMetrics.newJobsToday} today`}
            icon={Briefcase}
            trend="up"
          />
          <AdminStatsCard
            title="Success Rate"
            value={`${mockAdminMetrics.successRate}%`}
            change="+2.1% from last week"
            icon={TrendingUp}
            trend="up"
          />
          <AdminStatsCard
            title="Avg Match Score"
            value={`${mockAdminMetrics.avgMatchScore}%`}
            change="+1.2% from last week"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-card/50 backdrop-blur-sm border border-white/10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sources">Job Sources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "New user registered", user: "Sarah Johnson", time: "2 minutes ago" },
                    { action: "Job source sync completed", source: "LinkedIn", time: "15 minutes ago" },
                    { action: "Application submitted", user: "Michael Chen", time: "1 hour ago" },
                    { action: "Alert created", user: "Emily Rodriguez", time: "2 hours ago" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div>
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-subtle">{activity.user || activity.source}</p>
                      </div>
                      <span className="text-xs text-subtle">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { service: "API Server", status: "active", uptime: "99.9%" },
                    { service: "Database", status: "active", uptime: "99.8%" },
                    { service: "Job Scraper", status: "active", uptime: "98.5%" },
                    { service: "Email Service", status: "active", uptime: "99.7%" },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-foreground">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusBadge(service.status as any)}>{service.uptime}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-subtle" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card/50 border-white/10"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Add User</Button>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-subtle">User</TableHead>
                    <TableHead className="text-subtle">Join Date</TableHead>
                    <TableHead className="text-subtle">Last Active</TableHead>
                    <TableHead className="text-subtle">Alerts</TableHead>
                    <TableHead className="text-subtle">Applications</TableHead>
                    <TableHead className="text-subtle">Status</TableHead>
                    <TableHead className="text-subtle">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-white/5">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-subtle">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-subtle">{user.joinDate}</TableCell>
                      <TableCell className="text-subtle">{user.lastActive}</TableCell>
                      <TableCell className="text-foreground">{user.alertsCount}</TableCell>
                      <TableCell className="text-foreground">{user.applicationsCount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-card border-white/10">
                            <DropdownMenuItem className="text-foreground hover:bg-white/5">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-white/5">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Job Sources</h3>
              <Button className="bg-primary hover:bg-primary/90">Add Source</Button>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-subtle">Source</TableHead>
                    <TableHead className="text-subtle">Status</TableHead>
                    <TableHead className="text-subtle">Jobs Scraped</TableHead>
                    <TableHead className="text-subtle">Success Rate</TableHead>
                    <TableHead className="text-subtle">Last Sync</TableHead>
                    <TableHead className="text-subtle">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobSources.map((source) => (
                    <TableRow key={source.id} className="border-white/5">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{source.name}</p>
                          <p className="text-sm text-subtle">{source.url}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(source.status)}
                          <Badge className={getStatusBadge(source.status)}>{source.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{source.jobsScraped.toLocaleString()}</TableCell>
                      <TableCell className="text-foreground">{source.successRate}%</TableCell>
                      <TableCell className="text-subtle">{new Date(source.lastSync).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-card border-white/10">
                            <DropdownMenuItem className="text-foreground hover:bg-white/5">
                              <Activity className="h-4 w-4 mr-2" />
                              Sync Now
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-white/5">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Source
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Source
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {mockAnalyticsData.userGrowth.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div
                          className="bg-primary/20 border border-primary/30 rounded-t"
                          style={{
                            height: `${(data.users / Math.max(...mockAnalyticsData.userGrowth.map((d) => d.users))) * 200}px`,
                            width: "40px",
                          }}
                        />
                        <span className="text-xs text-subtle">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Skills */}
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Skills in Demand</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalyticsData.topSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-foreground">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${(skill.count / Math.max(...mockAnalyticsData.topSkills.map((s) => s.count))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-subtle w-12 text-right">{skill.count}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
