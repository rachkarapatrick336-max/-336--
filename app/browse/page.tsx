"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoCard } from "@/components/video-card"
import { Button } from "@/components/ui/button"
import { categories, trendingNow, newReleases, documentaries, musicVideos } from "@/lib/sample-data"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Loading from "./loading"

// Combine all videos for browse
const allVideos = [...trendingNow, ...newReleases, ...documentaries, ...musicVideos]

function BrowseContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "alphabetical">("newest")

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  // Filter videos by category
  const filteredVideos = selectedCategory
    ? allVideos.filter(
        (video) =>
          video.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "films" && video.category === "Drama") ||
          (selectedCategory === "films" && video.category === "Historical") ||
          (selectedCategory === "films" && video.category === "Epic")
      )
    : allVideos

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.title.localeCompare(b.title)
      case "newest":
        return parseInt(b.year || "0") - parseInt(a.year || "0")
      case "popular":
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-serif">
            Browse
          </h1>
          <p className="text-muted-foreground">
            Discover authentic Acholi films, documentaries, and cultural content
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-primary text-primary-foreground" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-primary text-primary-foreground" : ""}
            >
              {category.name}
              <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {sortedVideos.length} titles
          </p>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                  A-Z
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {sortedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedVideos.map((video) => (
              <ListVideoCard key={video.id} {...video} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedVideos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No content found in this category.
            </p>
            <Button
              variant="link"
              onClick={() => setSelectedCategory(null)}
              className="text-primary"
            >
              Browse all content
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

// List view card component
function ListVideoCard({
  id,
  title,
  image,
  year,
  duration,
  category,
  description,
}: {
  id: string
  title: string
  image: string
  year?: string
  duration?: string
  category?: string
  description?: string
}) {
  return (
    <a
      href={`/watch/${id}`}
      className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
    >
      <div className="relative w-24 md:w-32 aspect-[2/3] rounded overflow-hidden flex-shrink-0 bg-secondary">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {year && <span>{year}</span>}
          {duration && (
            <>
              <span>•</span>
              <span>{duration}</span>
            </>
          )}
          {category && (
            <>
              <span>•</span>
              <span className="text-primary">{category}</span>
            </>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </div>
    </a>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowseContent />
    </Suspense>
  )
}
