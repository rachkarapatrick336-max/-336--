"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface VideoCardProps {
  id: string
  title: string
  image: string
  year?: string
  duration?: string
  category?: string
  description?: string
}

export function VideoCard({
  id,
  title,
  image,
  year,
  duration,
  category,
  description,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative flex-shrink-0 w-[160px] md:w-[200px] lg:w-[240px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/watch/${id}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Content */}
          <div className={`absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-2 mb-2">
              <Button
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-8"
              >
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
            )}
          </div>
        </div>
      </Link>
      
      {/* Title and Meta */}
      <div className="mt-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {year && <span className="text-xs text-muted-foreground">{year}</span>}
          {duration && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{duration}</span>
            </>
          )}
          {category && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-primary">{category}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
