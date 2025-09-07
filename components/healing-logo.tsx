export function HealingLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Healing Guru Logo"
    >
      {/* Outer Circle - using a vibrant gold from your site */}
      <circle cx="50" cy="50" r="48" stroke="#d4ab3a" strokeWidth="4" />

      {/* Abstract Lotus/Sun Shape */}
      <g transform="translate(50,50)">
        {/* Larger Petals - using a gentle but visible charcoal */}
        <path
          d="M0 -35 C 20 -15, 20 15, 0 35 C -20 15, -20 -15, 0 -35 Z"
          fill="#36454F" // Charcoal color
          opacity="0.1"
          transform="rotate(45)"
        />

        {/* Main Petals - using the vibrant gold */}
        <path
          d="M0 -40 C 15 -20, 15 20, 0 40 C -15 20, -15 -20, 0 -40 Z"
          fill="#d4ab3a" // Gold color
        />
        <path
          d="M0 -40 C 15 -20, 15 20, 0 40 C -15 20, -15 -20, 0 -40 Z"
          fill="#d4ab3a"
          transform="rotate(90)"
        />
      </g>
      
      {/* Center Dot - clean and simple */}
      <circle cx="50" cy="50" r="6" fill="#f5f5dc" />
    </svg>
  )
}
