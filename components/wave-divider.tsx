import type React from 'react';
import Image from 'next/image';

/**
 * A reusable wave divider component that uses a single transparent PNG image
 * to create an elegant, layered transition effect.
 *
 * How to use:
 * 1. Make sure your wave image is named `wave-divider.png` and is in the `/public` folder.
 * 2. Place this component between two <section> elements where you want the transition.
 */
export function ImageWaveDivider() {
  return (
    // This container creates the space for the wave.
    // The negative top margin is a key detail: it pulls the wave up slightly
    // to ensure there is no ugly 1px gap between it and the section above.
    // The relative positioning is required for the Next.js Image component's "fill" layout.
    <div className="relative -mt-1 w-full h-24 md:h-32">
      <Image
        // Next.js automatically finds images in the 'public' folder.
        src="/wave-divider.svg"
        alt="Decorative layered wave divider"
        // The 'fill' layout makes the image expand to fit the parent div.
        layout="fill"
        // 'cover' ensures the image covers the area without being distorted.
        objectFit="cover"
      />
    </div>
  );
}

