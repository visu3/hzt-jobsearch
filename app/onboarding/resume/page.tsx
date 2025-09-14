"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { FileUpload } from "@/components/file-upload"
import { SkillChip } from "@/components/skill-chip"
import { Header } from "@/components/header"
import { Loader2, Brain, Plus } from "lucide-react"
import Link from "next/link"

const mockSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "Docker",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Agile",
  "REST APIs",
  "Machine Learning",
  "Data Analysis",
]

export default function ResumeUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")

  const handleFileSelect = (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)

    // Simulate file processing
    setTimeout(() => {
      const randomSkills = mockSkills.sort(() => 0.5 - Math.random()).slice(0, 8)
      setExtractedSkills(randomSkills)
      setSelectedSkills(randomSkills)
      setIsProcessing(false)
    }, 3000)
  }

  const handleFileRemove = () => {
    setUploadedFile(null)
    setExtractedSkills([])
    setSelectedSkills([])
    setIsProcessing(false)
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()])
      setCustomSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <ProgressIndicator steps={["Upload Resume", "Create Alert", "Complete"]} currentStep={0} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Your Resume</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Let our AI analyze your skills and experience to find the perfect job matches
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* File Upload */}
          <FileUpload onFileSelect={handleFileSelect} onFileRemove={handleFileRemove} uploadedFile={uploadedFile} />

          {/* Processing State */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                  <p className="text-muted-foreground mb-6">Our AI is extracting your skills and experience...</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Processing...</span>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Preview */}
          <AnimatePresence>
            {extractedSkills.length > 0 && !isProcessing && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="glass p-8">
                  <h3 className="text-xl font-semibold mb-4">Review Your Skills</h3>
                  <p className="text-muted-foreground mb-6">
                    We found these skills in your resume. Select the ones you want to highlight in your job search.
                  </p>

                  <div className="space-y-6">
                    {/* Extracted Skills */}
                    <div>
                      <h4 className="font-medium mb-3">Extracted Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {extractedSkills.map((skill) => (
                          <SkillChip
                            key={skill}
                            skill={skill}
                            isSelected={selectedSkills.includes(skill)}
                            onClick={() => toggleSkill(skill)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Selected Skills */}
                    {selectedSkills.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Selected Skills ({selectedSkills.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkills.map((skill) => (
                            <SkillChip
                              key={skill}
                              skill={skill}
                              isSelected={true}
                              isRemovable={true}
                              onRemove={() => removeSkill(skill)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Custom Skill */}
                    <div>
                      <h4 className="font-medium mb-3">Add Additional Skills</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter a skill..."
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
                          className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button onClick={addCustomSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {extractedSkills.length > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-between items-center"
            >
              <Link href="/auth">
                <Button variant="outline">Back</Button>
              </Link>

              <Link href="/onboarding/alert">
                <Button disabled={selectedSkills.length === 0}>
                  Continue to Job Alerts
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
