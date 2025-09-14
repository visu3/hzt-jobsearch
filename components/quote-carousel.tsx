"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const quotes = [
  "Small steps. Big futures.",
  "Talent is compound interest.",
  "Show up today; the rest follows.",
  "Clarity. Consistency. Courage.",
]

export function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-light text-center text-balance"
        >
          {quotes[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
