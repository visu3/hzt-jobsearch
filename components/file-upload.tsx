"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  acceptedTypes?: string[]
  maxSize?: number
  uploadedFile?: File | null
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  acceptedTypes = [".pdf", ".docx", ".doc"],
  maxSize = 10 * 1024 * 1024, // 10MB
  uploadedFile,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      setError(null)

      const files = Array.from(e.dataTransfer.files)
      const file = files[0]

      if (!file) return

      // Validate file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      if (!acceptedTypes.includes(fileExtension)) {
        setError(`Please upload a ${acceptedTypes.join(", ")} file`)
        return
      }

      // Validate file size
      if (file.size > maxSize) {
        setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
        return
      }

      onFileSelect(file)
    },
    [acceptedTypes, maxSize, onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setError(null)

      // Validate file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      if (!acceptedTypes.includes(fileExtension)) {
        setError(`Please upload a ${acceptedTypes.join(", ")} file`)
        return
      }

      // Validate file size
      if (file.size > maxSize) {
        setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
        return
      }

      onFileSelect(file)
    },
    [acceptedTypes, maxSize, onFileSelect],
  )

  if (uploadedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onFileRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        className={`glass transition-all duration-300 cursor-pointer ${
          isDragOver ? "border-primary bg-primary/5" : "border-dashed border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="block p-6 text-center cursor-pointer">
          <input type="file" className="hidden" accept={acceptedTypes.join(",")} onChange={handleFileInput} />

          <motion.div animate={{ scale: isDragOver ? 1.05 : 1 }} transition={{ duration: 0.2 }} className="space-y-2">
            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Drop your resume here</h3>
              <p className="text-xs text-muted-foreground mb-2">or click to browse files</p>
              <p className="text-xs text-muted-foreground">
                {acceptedTypes.join(", ")} up to {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>

            <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Choose File
            </Button>
          </motion.div>
        </label>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
