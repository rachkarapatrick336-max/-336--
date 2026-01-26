"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface HeroSectionProps {
  id: string
  title: string
  description: string
  image: string
  category?: string
  year?: string
  rating?: string
}

export function HeroSection({
  id,
  title,
  description,
  image,
  category,
  year,
  rating,
}: HeroSectionProps) {
  const [muted, setMuted] = useState(true)

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-32 md:pb-40 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          {/* Category & Year */}
          <div className="flex items-center gap-3 mb-3">
            {category && (
              <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                {category}
              </span>
            )}
            {year && (
              <span className="text-sm text-muted-foreground">{year}</span>
            )}
            {rating && (
              <span className="text-sm text-muted-foreground">{rating}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance font-serif">
            {title}
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-3 max-w-xl text-pretty">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link href={`/watch/${id}`}>
                <Play className="h-5 w-5 mr-2 fill-current" />
                Play Now
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-secondary/80 text-secondary-foreground hover:bg-secondary"
            >
              <Link href={`/watch/${id}`}>
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Link>
            </Button>
          </div>
        </div>

        {/* Mute Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 md:right-8 lg:right-12 bottom-32 md:bottom-40 border-muted-foreground/50 text-muted-foreground hover:text-foreground hover:border-foreground bg-transparent"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
    </section>
  )
}
