"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/file-upload"
import {
    Upload,
    CheckCircle,
    Plus,
    X,
    Brain,
    Sparkles,
    ArrowRight,
    FileText,
    Target,
    Zap
} from "lucide-react"
import Link from "next/link"

interface Skill {
    id: string
    name: string
    category: string
    confidence: number
}

export default function SkillsPage() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [extractedSkills, setExtractedSkills] = useState<Skill[]>([])
    const [customSkills, setCustomSkills] = useState<Skill[]>([])
    const [newSkill, setNewSkill] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    // Mock extracted skills for demo
    const mockSkills: Skill[] = [
        { id: "1", name: "React", category: "Frontend", confidence: 0.9 },
        { id: "2", name: "TypeScript", category: "Programming", confidence: 0.85 },
        { id: "3", name: "Node.js", category: "Backend", confidence: 0.8 },
        { id: "4", name: "PostgreSQL", category: "Database", confidence: 0.75 },
        { id: "5", name: "AWS", category: "Cloud", confidence: 0.7 },
        { id: "6", name: "Docker", category: "DevOps", confidence: 0.65 },
    ]

    const handleFileSelect = (file: File) => {
        setUploadedFile(file)
        setIsProcessing(true)

        // Simulate AI processing
        setTimeout(() => {
            setExtractedSkills(mockSkills)
            setIsProcessing(false)
        }, 3000)
    }

    const handleFileRemove = () => {
        setUploadedFile(null)
        setExtractedSkills([])
        setIsProcessing(false)
    }

    const addCustomSkill = () => {
        if (newSkill.trim()) {
            const skill: Skill = {
                id: Date.now().toString(),
                name: newSkill.trim(),
                category: "Custom",
                confidence: 1.0
            }
            setCustomSkills(prev => [...prev, skill])
            setNewSkill("")
        }
    }

    const removeSkill = (skillId: string, isCustom: boolean) => {
        if (isCustom) {
            setCustomSkills(prev => prev.filter(skill => skill.id !== skillId))
        } else {
            setExtractedSkills(prev => prev.filter(skill => skill.id !== skillId))
        }
    }

    const handleContinue = () => {
        setIsComplete(true)
        // In a real app, this would save to database
        setTimeout(() => {
            window.location.href = "/dashboard"
        }, 2000)
    }

    const allSkills = [...extractedSkills, ...customSkills]

    return (
        <div className="min-h-screen gradient-mesh">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mr-3">
                            <span className="text-primary-foreground font-bold text-xl">J</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-bold">JobFlow</h1>
                            <p className="text-muted-foreground">Build your skills profile</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        Upload your resume to automatically extract skills, or add them manually to get personalized job recommendations.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                    >
                        <Card className="glass p-4">
                            <div className="text-center mb-4">
                                <h2 className="text-lg font-bold mb-3">Extract Skills from Resume</h2>
                                <FileUpload
                                    onFileSelect={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    uploadedFile={uploadedFile}
                                />
                            </div>

                            {/* Processing State */}
                            <AnimatePresence>
                                {isProcessing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                                            />
                                            <p className="font-medium text-primary text-sm">Analyzing resume...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>

                    {/* Skills Display */}
                    <AnimatePresence>
                        {extractedSkills.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <Card className="glass p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                                                <Brain className="h-4 w-4 text-success" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">AI Extracted Skills</h3>
                                                <p className="text-sm text-muted-foreground">{extractedSkills.length} skills found</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {extractedSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                                                        <Sparkles className="h-3 w-3 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{skill.name}</p>
                                                        <p className="text-xs text-muted-foreground">{skill.category}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeSkill(skill.id, false)}
                                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Add Custom Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-6"
                    >
                         <Card className="glass p-6">
                             <div className="text-center mb-4">
                                 <h3 className="text-lg font-bold mb-1">Add Skills Manually</h3>
                                 <p className="text-sm text-muted-foreground">Add skills that weren't detected</p>
                             </div>

                            <div className="flex space-x-3 mb-4">
                                <div className="flex-1">
                                    <Label htmlFor="newSkill" className="sr-only">Add skill</Label>
                                    <Input
                                        id="newSkill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Enter a skill (e.g., Python, Project Management)"
                                        onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                                        className="h-10"
                                    />
                                </div>
                                <Button onClick={addCustomSkill} disabled={!newSkill.trim()} className="h-10">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            </div>

                            {customSkills.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {customSkills.map((skill, index) => (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="flex items-center justify-between p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
                                                    <Target className="h-3 w-3 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{skill.name}</p>
                                                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeSkill(skill.id, true)}
                                                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </motion.div>

                    {/* Skills Summary */}
                    {allSkills.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-6"
                        >
                            <Card className="glass p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                                            <FileText className="h-4 w-4 text-success" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">Your Skills Profile</h3>
                                            <p className="text-sm text-muted-foreground">{allSkills.length} skills ready</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {allSkills.map((skill) => (
                                        <Badge key={skill.id} variant="secondary" className="text-xs">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-success"></div>
                                        <span>AI: {extractedSkills.length}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Manual: {customSkills.length}</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Continue Button */}
                    {allSkills.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-center"
                        >
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={handleContinue}
                                    disabled={isComplete}
                                    size="lg"
                                    className="h-12 px-6 text-base font-medium"
                                >
                                    {isComplete ? (
                                        <>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Complete!
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-4 w-4 mr-2" />
                                            Continue to Dashboard
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
