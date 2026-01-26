import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/culture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Acholi Culture
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse?category=films" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Films
                </Link>
              </li>
              <li>
                <Link href="/browse?category=documentaries" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentaries
                </Link>
              </li>
              <li>
                <Link href="/browse?category=music" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Music Videos
                </Link>
              </li>
              <li>
                <Link href="/browse?category=series" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/devices" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Supported Devices
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-bold text-primary">ACHOLI</span>
            <span className="text-xl font-bold text-foreground">FLIXX</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Celebrating Acholi heritage through film and storytelling.
          </p>
        </div>
      </div>
    </footer>
  )
}
