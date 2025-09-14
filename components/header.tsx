"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">J</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">JobFlow</span>
              <span className="text-xs text-muted-foreground -mt-1">Smart opportunities await</span>
            </div>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/home"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Jobs
          </Link>
          <Link
            href="/alerts"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Alerts
          </Link>
          <Link
            href="/bookmarks"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Bookmarks
          </Link>
          <Link
            href="/applied"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Applied
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
