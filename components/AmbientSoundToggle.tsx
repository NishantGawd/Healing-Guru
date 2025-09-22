"use client";

import { useAppContext } from "@/components/site-context"; // Use your existing hook
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AmbientSoundToggle() {
  // Read the single, global state and the stable toggle function from the context
  const { isSoundPlaying, toggleSound } = useAppContext();

  return (
    <Button 
      onClick={toggleSound} // The button now calls the single, global toggle function
      variant="ghost" 
      size="icon"
      aria-label={isSoundPlaying ? "Mute ambient sound" : "Play ambient sound"}
      className="text-charcoal/70 hover:bg-beige hover:text-charcoal cursor-pointer"
    >
      {isSoundPlaying ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </Button>
  );
}

