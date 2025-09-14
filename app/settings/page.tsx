"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SkillChip } from "@/components/skill-chip"
import { User, Bell, Shield, Palette, Download, Trash2, Save, Plus, Mail, Smartphone, Globe, Eye } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    location: "San Francisco, CA",
    bio: "Experienced full-stack developer passionate about building scalable web applications and mentoring junior developers.",
    website: "https://alexjohnson.dev",
    phone: "+1 (555) 123-4567",
  })

  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "GraphQL",
  ])

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyDigest: true,
    jobRecommendations: true,
    applicationUpdates: true,
    marketingEmails: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowRecruiterContact: true,
  })

  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Settings saved:", { profile, skills, notifications, privacy })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-xl text-muted-foreground">Manage your account preferences and job search settings</p>
        </motion.div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 mr-3 text-primary" />
                <h2 className="text-2xl font-bold">Profile Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className="min-h-24"
                />
              </div>
            </Card>
          </motion.div>

          {/* Skills Management */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center mb-6">
                <Palette className="h-6 w-6 mr-3 text-primary" />
                <h2 className="text-2xl font-bold">Skills & Expertise</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} disabled={!newSkill.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillChip key={skill} skill={skill} isSelected={true} isRemovable={true} onRemove={removeSkill} />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 mr-3 text-primary" />
                <h2 className="text-2xl font-bold">Notification Preferences</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    key: "emailAlerts",
                    label: "Email Job Alerts",
                    description: "Receive email notifications when new jobs match your criteria",
                    icon: <Mail className="h-4 w-4" />,
                  },
                  {
                    key: "pushNotifications",
                    label: "Push Notifications",
                    description: "Get instant notifications on your device",
                    icon: <Smartphone className="h-4 w-4" />,
                  },
                  {
                    key: "weeklyDigest",
                    label: "Weekly Digest",
                    description: "Summary of new opportunities and application updates",
                    icon: <Mail className="h-4 w-4" />,
                  },
                  {
                    key: "jobRecommendations",
                    label: "Job Recommendations",
                    description: "Personalized job suggestions based on your profile",
                    icon: <Globe className="h-4 w-4" />,
                  },
                  {
                    key: "applicationUpdates",
                    label: "Application Updates",
                    description: "Status changes on your job applications",
                    icon: <Bell className="h-4 w-4" />,
                  },
                  {
                    key: "marketingEmails",
                    label: "Marketing Communications",
                    description: "Product updates and career tips",
                    icon: <Mail className="h-4 w-4" />,
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{item.icon}</div>
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 mr-3 text-primary" />
                <h2 className="text-2xl font-bold">Privacy & Visibility</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="recruiters">Recruiters Only</SelectItem>
                      <SelectItem value="private">Private - Only you can see</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Show Email Address</h3>
                      <p className="text-sm text-muted-foreground">Allow recruiters to see your email</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showEmail: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Show Phone Number</h3>
                      <p className="text-sm text-muted-foreground">Allow recruiters to see your phone</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showPhone: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Allow Recruiter Contact</h3>
                      <p className="text-sm text-muted-foreground">Let recruiters reach out with opportunities</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.allowRecruiterContact}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, allowRecruiterContact: checked }))}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Account Actions</h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save All Changes
                </Button>

                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>

                <Button variant="outline" className="flex-1 bg-transparent text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
