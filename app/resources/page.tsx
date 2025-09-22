"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteProvider } from "@/components/site-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Download, 
  Play, 
  Clock, 
  Search,
  Heart,
  Star,
  FileText,
  Mic,
  Video
} from "lucide-react";

// --- Realistic & High-Quality Content ---

const categories = [
  { id: "all", name: "All Resources" },
  { id: "meditation", name: "Mindfulness & Meditation" },
  { id: "healing", name: "Energy Healing" },
  { id: "wellness", name: "Holistic Wellness" }
];

const blogPosts = [
  {
    id: 1,
    title: "The Science of Stillness: How Meditation Rewires Your Brain",
    excerpt: "Explore the neuroscience behind mindfulness. Studies from institutions like Harvard have shown that regular meditation can increase grey matter in the brain, improving memory and emotional regulation.",
    category: "meditation",
    readTime: "6 min read",
    image: "https://placehold.co/600x400/faf8f5/8fbc8f?text=Meditation",
  },
  {
    id: 2,
    title: "An Introduction to Reiki: Healing with Universal Life Force",
    excerpt: "Reiki is a Japanese energy healing technique recognized by many wellness centers for its ability to promote deep relaxation and support the body's natural healing processes. Learn how it works.",
    category: "healing",
    readTime: "5 min read",
    image: "https://placehold.co/600x400/faf8f5/c2a25f?text=Reiki+Energy",
  },
  {
    id: 3,
    title: "Simple Breathwork Techniques to Reduce Anxiety Instantly",
    excerpt: "Based on principles from renowned experts like Dr. Andrew Huberman, discover how techniques like the 'physiological sigh' can immediately calm your nervous system in moments of stress.",
    category: "wellness",
    readTime: "4 min read",
    image: "https://placehold.co/600x400/faf8f5/8fbc8f?text=Breathwork",
  }
];

const downloads = [
  {
    id: 1,
    title: "Guided Breathing Exercise",
    description: "A 5-minute audio practice based on the 4-7-8 breathing technique, proven to help reduce stress and prepare the body for restful sleep.",
    type: "Audio",
    Icon: Mic,
    meta: "5 min MP3",
    category: "meditation",
    filePath: "/downloads/guided-breathing-exercise.txt" // Path to your file in /public
  },
  {
    id: 2,
    title: "Daily Affirmations for Healing",
    description: "A printable PDF of 30 powerful affirmations, curated by professional healers to foster self-love, resilience, and a positive mindset.",
    type: "PDF",
    Icon: FileText,
    meta: "1 page PDF",
    category: "healing",
    filePath: "/downloads/daily-affirmations.txt" // Path to your file in /public
  }
];

const testimonials = [
  {
    id: 1,
    name: "Dr. Alisha Verma, PhD",
    type: 'video',
    session: "Spiritual Counseling",
    text: "As a clinical psychologist, I was deeply impressed by the compassionate and intuitive guidance provided. It's a wonderful complement to traditional therapy for holistic well-being.",
    image: "https://placehold.co/600x400/4a5568/ffffff?text=Play+Video",
  }
];

// --- Page Component ---

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allContent = useMemo(() => {
    const blogs = blogPosts.map(item => ({ ...item, contentType: 'blog' }));
    const dloads = downloads.map(item => ({ ...item, contentType: 'download' }));
    const stories = testimonials.map(item => ({ ...item, contentType: 'testimonial', category: 'wellness' }));
    return [...blogs, ...dloads, ...stories];
  }, []);

  const filteredContent = useMemo(() => {
    let content = allContent;
    if (selectedCategory !== "all") {
      content = content.filter(item => item.category === selectedCategory);
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      content = content.filter(item =>
        item.title?.toLowerCase().includes(lowercasedQuery) ||
        item.excerpt?.toLowerCase().includes(lowercasedQuery) ||
        item.description?.toLowerCase().includes(lowercasedQuery) ||
        item.text?.toLowerCase().includes(lowercasedQuery)
      );
    }
    return content;
  }, [allContent, selectedCategory, searchQuery]);

  return (
    <SiteProvider>
      <SiteHeader />
      <main className="section bg-cream">
        <div className="container-soft">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Healing Resources</h1>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto leading-relaxed">
              A curated collection of guides, practices, and stories to support you on your path to wellness and self-discovery.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 w-5 h-5" />
              <Input
                placeholder="Search for articles, meditations, wellness tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full bg-white border-beige focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full transition-colors ${
                    selectedCategory === category.id 
                    ? "bg-brand text-cream border-brand" 
                    : "bg-transparent border-beige text-charcoal/70 hover:bg-brand/10 hover:border-brand"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => {
              if (item.contentType === 'blog') {
                return (
                  <Card key={`blog-${item.id}`} className="bg-white border-beige rounded-xl overflow-hidden group transition hover:shadow-lg hover:-translate-y-1">
                    <Link href="#" className="cursor-pointer">
                      <div className="aspect-video overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-3 bg-brand/10 text-brand">{item.category}</Badge>
                        <h3 className="font-serif text-xl font-semibold mb-2 text-charcoal group-hover:text-brand transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-charcoal/70 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-charcoal/50">
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {item.readTime}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              }
              
              if (item.contentType === 'download') {
                 const Icon = item.Icon;
                 return (
                  <Card key={`download-${item.id}`} className="bg-white border-beige rounded-xl flex flex-col transition hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                           <Icon className="w-6 h-6 text-brand" />
                        </div>
                        <Badge variant="outline" className="border-beige">{item.type}</Badge>
                      </div>
                      <h3 className="font-serif text-lg font-semibold mb-2 text-charcoal">{item.title}</h3>
                      <p className="text-charcoal/70 text-sm mb-4 flex-grow">{item.description}</p>
                      <div className="text-xs text-charcoal/50 mb-4">{item.meta}</div>
                      <Button asChild className="w-full bg-gold hover:bg-gold/90 text-cream cursor-pointer">
                        <a href={item.filePath} download>
                          <Download className="w-4 h-4 mr-2" /> Download Free
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              }
              
              if (item.contentType === 'testimonial') {
                return (
                  <Card key={`testimonial-${item.id}`} className="bg-charcoal text-cream border-charcoal/80 rounded-xl transition hover:shadow-lg hover:-translate-y-1">
                     <Link href="#" className="cursor-pointer">
                      <div className="aspect-video relative rounded-t-xl overflow-hidden group">
                         <img src={item.image} alt={`Video testimonial from ${item.name}`} className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-8 h-8 text-white fill-white ml-1"/>
                            </div>
                         </div>
                      </div>
                     </Link>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                           <Star className="w-4 h-4 text-gold fill-gold" />
                           <Star className="w-4 h-4 text-gold fill-gold" />
                           <Star className="w-4 h-4 text-gold fill-gold" />
                           <Star className="w-4 h-4 text-gold fill-gold" />
                           <Star className="w-4 h-4 text-gold fill-gold" />
                        </div>
                         <Badge variant="outline" className="border-cream/20 text-cream/80">Verified Client</Badge>
                      </div>
                      <blockquote className="mb-4 italic text-cream/80">"{item.text}"</blockquote>
                      <div className="border-t pt-4 border-cream/20">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-cream/60">{item.session}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-charcoal/20" />
              <h3 className="font-serif text-xl font-semibold text-charcoal/80">No Resources Found</h3>
              <p className="text-charcoal/60">Try adjusting your search or selecting a different category.</p>
            </div>
          )}

          <Card className="mt-16 md:mt-24 bg-beige/30 border-brand/20">
            <CardContent className="py-8 text-center">
              <Heart className="w-10 h-10 mx-auto mb-4 text-brand" />
              <h2 className="font-serif text-2xl text-charcoal mb-4">Stay Connected to Your Journey</h2>
              <p className="mb-6 text-charcoal/80 max-w-lg mx-auto">
                Receive weekly healing tips, new resources, and exclusive content in your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white border-beige focus:ring-2 focus:ring-brand h-12"
                />
                <Button type="submit" className="bg-gold hover:bg-gold/90 text-cream h-12">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </main>
      <SiteFooter />
    </SiteProvider>
  );
}

