"use client"

import React, { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Upload,
  X,
  Film,
  ImageIcon,
  Clock,
  Calendar,
  Tag,
  Users,
  Globe,
  Star,
  Subtitles,
  ArrowLeft,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES = [
  "Drama",
  "Documentary",
  "Culture",
  "Music",
  "Historical",
  "Animation",
  "Epic",
  "Series",
  "Short Film",
  "Comedy",
  "Romance",
]

const RATINGS = ["G", "PG", "PG-13", "R", "NC-17"]

const LANGUAGES = ["Acholi", "English", "Swahili", "Luganda", "Luo", "Other"]

const SUBTITLE_OPTIONS = ["English", "Acholi", "Swahili", "French", "None"]

export default function AdminUploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState("")
  const [duration, setDuration] = useState("")
  const [rating, setRating] = useState("")
  const [director, setDirector] = useState("")
  const [castInput, setCastInput] = useState("")
  const [cast, setCast] = useState<string[]>([])
  const [language, setLanguage] = useState("")
  const [subtitles, setSubtitles] = useState<string[]>([])
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [thumbnailName, setThumbnailName] = useState("")
  const [videoName, setVideoName] = useState("")
  const [videoSize, setVideoSize] = useState("")
  const [isDraggingThumb, setIsDraggingThumb] = useState(false)
  const [isDraggingVideo, setIsDraggingVideo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleThumbnailDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDraggingThumb(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        setThumbnailName(file.name)
        const reader = new FileReader()
        reader.onload = (ev) => setThumbnailPreview(ev.target?.result as string)
        reader.readAsDataURL(file)
      }
    },
    []
  )

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setThumbnailName(file.name)
      const reader = new FileReader()
      reader.onload = (ev) => setThumbnailPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleVideoDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDraggingVideo(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("video/")) {
        setVideoName(file.name)
        setVideoSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`)
      }
    },
    []
  )

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideoName(file.name)
      setVideoSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`)
    }
  }

  const addCastMember = () => {
    const trimmed = castInput.trim()
    if (trimmed && !cast.includes(trimmed)) {
      setCast([...cast, trimmed])
      setCastInput("")
    }
  }

  const removeCastMember = (name: string) => {
    setCast(cast.filter((c) => c !== name))
  }

  const toggleSubtitle = (lang: string) => {
    setSubtitles((prev) =>
      prev.includes(lang) ? prev.filter((s) => s !== lang) : [...prev, lang]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 3000)
    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setYear("")
    setDuration("")
    setRating("")
    setDirector("")
    setCast([])
    setCastInput("")
    setLanguage("")
    setSubtitles([])
    setThumbnailPreview(null)
    setThumbnailName("")
    setVideoName("")
    setVideoSize("")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Upload Content</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">ACHOLI</span>
            <span className="text-xl font-bold text-foreground">FLIXX</span>
          </Link>
        </div>
      </div>

      {/* Success banner */}
      {isSuccess && (
        <div className="bg-primary/20 border-b border-primary/30 px-4 py-3 flex items-center justify-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium text-primary">Content uploaded successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Media Uploads */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                Thumbnail Image
              </Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDraggingThumb(true)
                }}
                onDragLeave={() => setIsDraggingThumb(false)}
                onDrop={handleThumbnailDrop}
                className={`relative aspect-video rounded-lg border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                  isDraggingThumb
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground bg-secondary/30"
                }`}
                onClick={() =>
                  document.getElementById("thumbnail-input")?.click()
                }
                role="button"
                tabIndex={0}
                aria-label="Upload thumbnail image"
              >
                {thumbnailPreview ? (
                  <>
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-sm text-foreground font-medium">
                        Click to replace
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 bg-background/80 hover:bg-background text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        setThumbnailPreview(null)
                        setThumbnailName("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      JPG, PNG, WebP (16:9 recommended)
                    </p>
                  </div>
                )}
                <input
                  id="thumbnail-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleThumbnailSelect}
                />
              </div>
              {thumbnailName && (
                <p className="text-xs text-muted-foreground truncate">
                  {thumbnailName}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" />
                Video File
              </Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDraggingVideo(true)
                }}
                onDragLeave={() => setIsDraggingVideo(false)}
                onDrop={handleVideoDrop}
                className={`relative rounded-lg border-2 border-dashed transition-all cursor-pointer p-8 ${
                  isDraggingVideo
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground bg-secondary/30"
                }`}
                onClick={() =>
                  document.getElementById("video-input")?.click()
                }
                role="button"
                tabIndex={0}
                aria-label="Upload video file"
              >
                {videoName ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Film className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground font-medium truncate">
                        {videoName}
                      </p>
                      <p className="text-xs text-muted-foreground">{videoSize}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVideoName("")
                        setVideoSize("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      MP4, WebM, MOV (max 4GB)
                    </p>
                  </div>
                )}
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  onChange={handleVideoSelect}
                />
              </div>
            </div>

            {/* Subtitles */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Subtitles className="h-4 w-4 text-primary" />
                Subtitles
              </Label>
              <div className="flex flex-wrap gap-2">
                {SUBTITLE_OPTIONS.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleSubtitle(lang)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      subtitles.includes(lang)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-foreground">
                Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-secondary border-border"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Write a compelling description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-secondary border-border min-h-[100px] resize-y"
                required
              />
            </div>

            {/* Category, Year, Duration Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  Category *
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Year *
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2025"
                  min={1900}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-secondary border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Duration *
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g. 1h 45m"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-secondary border-border"
                  required
                />
              </div>
            </div>

            {/* Rating and Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-primary" />
                  Rating
                </Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {RATINGS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  Language *
                </Label>
                <Select value={language} onValueChange={setLanguage} required>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Director */}
            <div className="space-y-2">
              <Label htmlFor="director" className="text-sm font-semibold text-foreground">
                Director
              </Label>
              <Input
                id="director"
                placeholder="Director name"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            {/* Cast */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-primary" />
                Cast Members
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add cast member"
                  value={castInput}
                  onChange={(e) => setCastInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addCastMember()
                    }
                  }}
                  className="bg-secondary border-border"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCastMember}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>
              {cast.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {cast.map((member) => (
                    <Badge
                      key={member}
                      variant="secondary"
                      className="pl-3 pr-1.5 py-1 gap-1 bg-secondary text-secondary-foreground"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => removeCastMember(member)}
                        className="ml-1 h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            {/* Submit */}
            <div className="flex items-center gap-4 pt-2">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Content"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("")
                  setDescription("")
                  setCategory("")
                  setYear("")
                  setDuration("")
                  setRating("")
                  setDirector("")
                  setCast([])
                  setCastInput("")
                  setLanguage("")
                  setSubtitles([])
                  setThumbnailPreview(null)
                  setThumbnailName("")
                  setVideoName("")
                  setVideoSize("")
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
