"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Chrome } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/skills"
    }, 2000)
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mr-4">
              <span className="text-primary-foreground font-bold text-2xl">J</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold">JobFlow</h1>
              <p className="text-muted-foreground text-lg">Smart opportunities await</p>
            </div>
          </div>
        </div>

        <Card className="glass p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Sign in to continue</h2>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 text-base font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-300"
          >
            {isLoading ? (
              <span className="inline-flex items-center">Loading…</span>
            ) : (
              <>
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <Link href="/auth">
              <Button variant="outline" className="w-full h-12 text-base font-medium">
                More Sign-in Options
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
