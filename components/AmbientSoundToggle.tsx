"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  // useRef is used to hold a reference to the audio element
  // so it persists across re-renders without being recreated.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // This effect runs only once on the client-side to create the audio object.
  // This prevents errors during server-side rendering.
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio('/sounds/ambient-chimes.mp3');
      audioRef.current.loop = true; // Make the sound loop continuously
      audioRef.current.volume = 0.3; // Set a gentle, non-intrusive volume
    }
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // The play() method can sometimes be rejected by the browser
      // if the user hasn't interacted with the page yet.
      // The .catch() handles this gracefully.
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button 
      onClick={toggleSound} 
      variant="ghost" 
      size="icon"
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      className="text-charcoal/70 hover:bg-beige hover:text-charcoal"
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </Button>
  );
}
