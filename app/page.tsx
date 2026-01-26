import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentRow } from "@/components/content-row"
import { Footer } from "@/components/footer"
import {
  featuredContent,
  trendingNow,
  newReleases,
  documentaries,
  musicVideos,
} from "@/lib/sample-data"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection {...featuredContent} />

      {/* Content Rows */}
      <div className="relative z-10 -mt-20 md:-mt-32 pb-12">
        <ContentRow title="Trending Now" videos={trendingNow} />
        <ContentRow title="New Releases" videos={newReleases} />
        <ContentRow title="Documentaries" videos={documentaries} />
        <ContentRow title="Music & Performances" videos={musicVideos} />
      </div>

      <Footer />
    </main>
  )
}
