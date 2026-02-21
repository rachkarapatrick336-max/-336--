"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Wallet,
  Gift,
  ChevronRight,
  Check,
  Phone,
  Mail,
  MapPin,
  User,
  Shield,
  Banknote,
  Star,
  Handshake,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const BENEFITS = [
  {
    icon: <Banknote className="h-6 w-6" />,
    title: "Earn Commission",
    description:
      "Earn up to 25% commission on every subscription you sell. The more you sell, the more you earn.",
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Bonus Rewards",
    description:
      "Hit monthly targets and unlock bonus rewards including free premium access and cash bonuses.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Growth Tools",
    description:
      "Get access to marketing materials, referral links, and a personal agent dashboard to track sales.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Build Your Network",
    description:
      "Grow your customer base in your community. Help your people access Acholi cultural content.",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Weekly Payouts",
    description:
      "Receive your earnings every week via Mobile Money, bank transfer, or Pesapal.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Agent Tiers",
    description:
      "Progress from Bronze to Gold agent status with increasing commission rates and exclusive perks.",
  },
]

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Register",
    description: "Fill out the agent registration form below with your details.",
  },
  {
    step: 2,
    title: "Get Approved",
    description: "Our team reviews your application within 24-48 hours.",
  },
  {
    step: 3,
    title: "Start Selling",
    description: "Receive your agent code and start selling subscriptions in your area.",
  },
  {
    step: 4,
    title: "Earn Money",
    description: "Track your sales and receive weekly payouts for all successful subscriptions.",
  },
]

export default function AgentPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [district, setDistrict] = useState("")
  const [experience, setExperience] = useState("")
  const [motivation, setMotivation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground font-serif">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Thank you, <span className="text-foreground font-medium">{fullName}</span>!
            We have received your agent application. Our team will review it and contact
            you within 24-48 hours at{" "}
            <span className="text-foreground font-medium">{phone}</span>.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Back to Home
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button variant="outline" className="w-full">
                View Subscription Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Become an Agent</h1>
              <p className="text-xs text-muted-foreground">Partner Program</p>
            </div>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">ACHOLI</span>
            <span className="text-xl font-bold text-foreground">FLIXX</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center space-y-4 relative">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mx-auto">
            <Handshake className="h-4 w-4" />
            Agent Program
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif text-balance leading-tight">
            Earn Money Selling Acholi Content Subscriptions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our agent network and earn commissions by bringing Acholi cultural
            content to communities across Uganda and beyond.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() =>
                document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Register Now
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Link href="/subscribe">
              <Button size="lg" variant="outline">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card/50 border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h3 className="text-2xl font-bold text-foreground font-serif text-center mb-10">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-bold">
                  {item.step}
                </div>
                <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h3 className="text-2xl font-bold text-foreground font-serif text-center mb-10">
            Why Become an Agent?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card rounded-lg border border-border p-6 space-y-3"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register-form"
        className="bg-card/50 border-y border-border py-16"
      >
        <div className="max-w-xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-bold text-foreground font-serif">
              Agent Registration
            </h3>
            <p className="text-muted-foreground">
              Fill in your details to apply as an Acholiflixx agent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="agent-email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="agent-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="agent-phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="agent-phone"
                  type="tel"
                  placeholder="e.g. 0771234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                  required
                />
              </div>
            </div>

            {/* Location & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="district"
                    placeholder="e.g. Gulu"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Town / Village</Label>
                <Input
                  id="location"
                  placeholder="Your area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Sales / Marketing Experience</Label>
              <Input
                id="experience"
                placeholder="e.g. 2 years in mobile money agent work"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">
                Why do you want to be an Acholiflixx agent?
              </Label>
              <Textarea
                id="motivation"
                placeholder="Tell us why you'd be a great agent..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="bg-secondary border-border min-h-[80px] resize-y"
              />
            </div>

            <Separator className="bg-border" />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              Your information is secure and will only be used for the agent program.
            </p>
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center space-y-4">
          <p className="text-muted-foreground">
            Have questions about the agent program?
          </p>
          <p className="text-sm text-muted-foreground">
            Contact us at{" "}
            <a
              href="mailto:agents@acholiflixx.com"
              className="text-primary hover:underline"
            >
              agents@acholiflixx.com
            </a>{" "}
            or call{" "}
            <a href="tel:+256700000000" className="text-primary hover:underline">
              +256 700 000 000
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
