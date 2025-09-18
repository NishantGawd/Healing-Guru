"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion"; // 1. Import the 'Variants' type

const breathingCycle = [
  { text: "Breathe In...", duration: 4000 },
  { text: "Hold", duration: 4000 },
  { text: "Breathe Out...", duration: 6000 },
];

export function MindfulBreathing() {
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
    }, breathingCycle[cycleIndex].duration);

    return () => clearInterval(interval);
  }, [cycleIndex]);

  const currentPhase = breathingCycle[cycleIndex];
  
  // 2. Apply the 'Variants' type to the animation object
  const circleVariants: Variants = {
    inhale: { scale: 1.5, transition: { duration: 4, ease: "easeInOut" } },
    hold: { scale: 1.5, transition: { duration: 4, ease: "easeInOut" } },
    exhale: { scale: 1, transition: { duration: 6, ease: "easeInOut" } },
  };

  const getAnimationState = () => {
    if (cycleIndex === 0) return "inhale";
    if (cycleIndex === 1) return "hold";
    return "exhale";
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-80 rounded-lg overflow-hidden bg-cream border border-beige p-6">
      <motion.div
        className="absolute w-48 h-48 bg-brand/20 rounded-full"
        variants={circleVariants}
        initial="exhale"
        animate={getAnimationState()}
      />
      <motion.div
        className="absolute w-64 h-64 bg-brand/10 rounded-full"
        variants={circleVariants}
        initial="exhale"
        animate={getAnimationState()}
      />
      
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhase.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative text-2xl font-serif text-charcoal z-10"
        >
          {currentPhase.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

