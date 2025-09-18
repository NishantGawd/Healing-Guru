import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// In a real app, this data would come from a database or CMS.
const testimonials = [
  {
    quote: "Working with Healing Guru was a transformative experience. I found a sense of clarity and peace I hadn't felt in years. Truly life-changing.",
    name: "Aman S.",
    location: "Jaipur, Rajasthan",
    avatar: "/client-portrait-natural-light.png",
  },
  {
    quote: "The meditation guidance helped me build a consistent practice that has profoundly reduced my daily stress. I feel more grounded and centered.",
    name: "Aarav M.",
    location: "Delhi",
    avatar: "/client-portrait-serene.png",
  },
  {
    quote: "I was skeptical about energy healing, but the session left me feeling lighter and more emotionally balanced. I can't recommend it enough.",
    name: "Anika V.",
    location: "Mumbai",
    avatar: "/client-portrait-soft-light.png",
  },
];

export function HumanizedTestimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className="bg-cream border-beige flex flex-col">
          <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
            <Image
              src={testimonial.avatar}
              alt={`Portrait of ${testimonial.name}`}
              width={80}
              height={80}
              className="rounded-full mb-4 border-2 border-beige p-1"
            />
            <p className="text-charcoal/80 italic flex-grow">"{testimonial.quote}"</p>
            <div className="mt-4">
              <p className="font-semibold text-charcoal">{testimonial.name}</p>
              <p className="text-xs text-charcoal/60">{testimonial.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
