"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Power of Crystal Healing: A Beginner's Guide",
    excerpt: "Discover how crystals can enhance your healing journey and bring balance to your mind, body, and spirit.",
    image: "/crystal-healing-blog.jpg",
    category: "Crystal Healing",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["crystals", "healing", "beginner", "energy"],
  },
  {
    id: 2,
    title: "Meditation Techniques for Inner Peace",
    excerpt: "Learn simple yet powerful meditation practices that can transform your daily life and reduce stress.",
    image: "/meditation-techniques-blog.jpg",
    category: "Meditation",
    author: "Sarah Johnson",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["meditation", "mindfulness", "peace", "stress-relief"],
  },
  {
    id: 3,
    title: "Essential Oils for Emotional Healing",
    excerpt: "Explore the therapeutic benefits of aromatherapy and how essential oils can support emotional wellness.",
    image: "/essential-oils-blog.jpg",
    category: "Aromatherapy",
    author: "Sarah Johnson",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["aromatherapy", "essential-oils", "emotions", "wellness"],
  },
  {
    id: 4,
    title: "Sound Healing: Frequencies for the Soul",
    excerpt: "Understand how sound vibrations can promote healing and create harmony within your energy field.",
    image: "/sound-healing-blog.jpg",
    category: "Sound Healing",
    author: "Sarah Johnson",
    date: "2023-12-28",
    readTime: "8 min read",
    tags: ["sound-healing", "vibrations", "energy", "harmony"],
  },
  {
    id: 5,
    title: "Creating Sacred Space in Your Home",
    excerpt: "Transform any corner of your home into a peaceful sanctuary for healing and spiritual practice.",
    image: "/sacred-space-blog.jpg",
    category: "Sacred Space",
    author: "Sarah Johnson",
    date: "2023-12-20",
    readTime: "4 min read",
    tags: ["sacred-space", "home", "sanctuary", "spiritual"],
  },
  {
    id: 6,
    title: "The Art of Energy Cleansing",
    excerpt: "Learn powerful techniques to clear negative energy and maintain a positive, healing environment.",
    image: "/energy-cleansing-blog.jpg",
    category: "Energy Work",
    author: "Sarah Johnson",
    date: "2023-12-15",
    readTime: "6 min read",
    tags: ["energy-cleansing", "negative-energy", "protection", "cleansing"],
  },
]

const categories = [
  "All",
  "Crystal Healing",
  "Meditation",
  "Aromatherapy",
  "Sound Healing",
  "Sacred Space",
  "Energy Work",
]

export default function BlogPage() {
  const [offsetY, setOffsetY] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6


  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  return (
    <AuthProvider>
      <SiteHeader />
      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
            <Image
              src="/healing-blog-hero.jpg"
              alt="Peaceful healing journal with crystals and plants in soft natural light"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-charcoal/30" />
          </div>

          <div className="relative z-10 flex h-full items-end">
            <div className="container-soft pb-12">
              <h1 className="font-serif text-5xl md:text-6xl text-cream drop-shadow-lg">Healing Blog</h1>
              <p className="mt-4 text-lg text-cream/90 drop-shadow-md max-w-2xl">
                Insights, wisdom, and guidance for your healing journey
              </p>
            </div>
          </div>
        </section>

        {/* --- SEARCH AND FILTER SECTION --- */}
        <section className="section bg-cream">
          <div className="container-soft">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 bg-beige border-brand/20 focus:border-brand text-charcoal"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-charcoal/60" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category)
                        setCurrentPage(1)
                      }}
                      className={
                        selectedCategory === category
                          ? "bg-brand text-cream hover:bg-brand/90"
                          : "border-brand/20 text-charcoal hover:bg-brand/10"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-charcoal/70 mb-6">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </section>

        {/* --- BLOG POSTS GRID --- */}
        <section className="section bg-beige/30">
          <div className="container-soft">
            {currentPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group overflow-hidden bg-cream border-brand/10 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3 bg-brand text-cream">{post.category}</Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="font-serif text-xl text-charcoal group-hover:text-brand transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>

                      <div className="flex items-center gap-4 text-sm text-charcoal/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-charcoal/80 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-brand/20 text-charcoal/70">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-charcoal/60">{post.readTime}</span>
                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-brand hover:text-brand/80 hover:bg-brand/10 p-0"
                          >
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-charcoal/60 text-lg">No articles found matching your search criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setCurrentPage(1)
                  }}
                  className="mt-4 bg-brand text-cream hover:bg-brand/90"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-brand/20 text-charcoal hover:bg-brand/10"
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-brand text-cream hover:bg-brand/90"
                        : "border-brand/20 text-charcoal hover:bg-brand/10"
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-brand/20 text-charcoal hover:bg-brand/10"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* --- NEWSLETTER SIGNUP --- */}
        <section className="section bg-brand/10">
          <div className="container-soft text-center">
            <h2 className="font-serif text-3xl text-charcoal mb-4">Stay Connected</h2>
            <p className="text-charcoal/80 mb-6 max-w-2xl mx-auto">
              Subscribe to receive the latest healing insights, wellness tips, and spiritual guidance directly in your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-cream border-brand/20 focus:border-brand text-charcoal"
              />
              <Button className="bg-brand text-cream hover:bg-brand/90 glowing-button">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}
