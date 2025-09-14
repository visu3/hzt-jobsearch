"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Chrome, ArrowLeft, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Simulate loading for demo
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would redirect to /onboarding/resume
      window.location.href = "/onboarding/resume"
    }, 2000)
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4">
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-success/5 blur-2xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Main Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="glass p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">J</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to JobFlow</h1>
              <p className="text-muted-foreground text-balance">
                Sign in to discover opportunities that match your unique skills and ambitions
              </p>
            </div>

            {/* Google Sign In Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mb-6">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 text-base font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-300"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Chrome className="h-5 w-5 mr-3" />
                    Continue with Google
                  </>
                )}
              </Button>
            </motion.div>

            {/* Features */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-3 text-success" />
                Secure authentication with Google
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Zap className="h-4 w-4 mr-3 text-primary" />
                Instant access to personalized job matches
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-3 text-success" />
                Join 50,000+ professionals finding better careers
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center text-balance">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            New to JobFlow?{" "}
            <span className="text-foreground font-medium">
              Your personalized job search starts with a simple sign-in
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
