import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoPlayer } from "@/components/video-player"
import { ContentRow } from "@/components/content-row"
import { Button } from "@/components/ui/button"
import { Plus, Share2, ThumbsUp, Download } from "lucide-react"
import { trendingNow, newReleases, documentaries } from "@/lib/sample-data"

// Get video details based on ID
function getVideoDetails(id: string) {
  const allVideos = [...trendingNow, ...newReleases, ...documentaries]
  const video = allVideos.find((v) => v.id === id)

  if (video) {
    return {
      ...video,
      fullDescription: `${video.description} This compelling production takes viewers on an unforgettable journey through the heart of Acholi culture, showcasing the resilience, traditions, and spirit of the people. Through stunning cinematography and authentic storytelling, experience the rich tapestry of Northern Uganda like never before.`,
      director: "Okello James",
      cast: ["Auma Grace", "Onen David", "Lakot Sarah", "Ocen Patrick"],
      language: "Luo (Acholi)",
      subtitles: ["English", "Swahili", "French"],
      releaseDate: video.year || "2024",
      rating: "PG-13",
      genres: [video.category || "Drama", "Cultural", "African Cinema"],
    }
  }

  // Default featured content
  return {
    id: "featured-1",
    title: "The Last Kingdom of Acholi",
    image: "/images/hero-featured.jpg",
    fullDescription:
      "A powerful documentary exploring the rich history of the Acholi kingdom, from ancient traditions to modern-day cultural preservation. Follow the journey of elders as they share stories passed down through generations, revealing the wisdom and resilience of the Acholi people. Through stunning cinematography and authentic storytelling, experience the rich tapestry of Northern Uganda like never before.",
    duration: "1h 45m",
    category: "Documentary",
    director: "Okello James",
    cast: ["Auma Grace", "Onen David", "Lakot Sarah", "Ocen Patrick"],
    language: "Luo (Acholi)",
    subtitles: ["English", "Swahili", "French"],
    releaseDate: "2024",
    rating: "PG-13",
    genres: ["Documentary", "Cultural", "History"],
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params
  const video = getVideoDetails(id)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Video Player Section */}
        <div className="px-0 md:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <VideoPlayer
              poster={video.image}
              title={video.title}
            />
          </div>
        </div>

        {/* Video Details */}
        <div className="px-4 md:px-8 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
                  {video.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded border border-primary/30">
                    {video.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {video.releaseDate}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {video.duration}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {video.language}
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {video.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button>
                  <Button variant="outline">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {video.fullDescription}
                </p>
              </div>

              {/* Side Info */}
              <div className="lg:w-80 space-y-6">
                {/* Director */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Director
                  </h3>
                  <p className="text-foreground">{video.director}</p>
                </div>

                {/* Cast */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Cast
                  </h3>
                  <p className="text-foreground">{video.cast.join(", ")}</p>
                </div>

                {/* Subtitles */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Subtitles
                  </h3>
                  <p className="text-foreground">{video.subtitles.join(", ")}</p>
                </div>

                {/* Audio */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Audio
                  </h3>
                  <p className="text-foreground">{video.language}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Content */}
        <div className="py-8">
          <ContentRow
            title="More Like This"
            videos={[...documentaries, ...trendingNow].slice(0, 8)}
          />
          <ContentRow title="You May Also Like" videos={newReleases} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
