"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function MindfulBreathing() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCount((prev) => {
        if (phase === "inhale" && prev >= 4) {
          setPhase("hold")
          return 0
        } else if (phase === "hold" && prev >= 2) {
          setPhase("exhale")
          return 0
        } else if (phase === "exhale" && prev >= 6) {
          setPhase("inhale")
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase])

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
    }
  }

  const getScale = () => {
    switch (phase) {
      case "inhale":
        return 1.2
      case "hold":
        return 1.2
      case "exhale":
        return 0.8
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center"
        animate={{ scale: isActive ? getScale() : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="text-center">
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-foreground"
            >
              {getPhaseText()}
            </motion.div>
          )}
        </div>
      </motion.div>

      <Button onClick={() => setIsActive(!isActive)} variant={isActive ? "secondary" : "default"} className="px-8">
        {isActive ? "Stop" : "Start Breathing Exercise"}
      </Button>

      {isActive && (
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Follow the circle's rhythm. Breathe in for 4 seconds, hold for 2, breathe out for 6.
        </p>
      )}
    </div>
  )
}
