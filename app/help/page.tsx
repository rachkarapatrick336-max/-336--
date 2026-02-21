"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  UserPlus,
  LogIn,
  CreditCard,
  ChevronDown,
  HelpCircle,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Tutorial {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  steps: {
    title: string
    description: string
    image?: string
  }[]
}

const TUTORIALS: Tutorial[] = [
  {
    id: "signup",
    title: "How to Sign Up",
    description: "Create your Acholiflixx account in a few simple steps.",
    icon: <UserPlus className="h-6 w-6" />,
    steps: [
      {
        title: "Go to the Sign Up Page",
        description:
          'Click the user icon in the top right corner of the website, then select "Sign Up" from the menu. You can also go directly to the sign up page.',
      },
      {
        title: "Enter Your Details",
        description:
          "Fill in your full name, email address, and create a strong password. The password meter will help you create a secure password with at least 8 characters.",
      },
      {
        title: "Agree to Terms",
        description:
          "Read and accept the Terms of Service and Privacy Policy by checking the checkbox.",
      },
      {
        title: "Create Your Account",
        description:
          'Click the "Create Account" button. You can also sign up faster using your Google or Facebook account.',
      },
      {
        title: "Verify Your Email",
        description:
          "Check your email inbox for a verification link. Click it to activate your account and start exploring content.",
      },
    ],
  },
  {
    id: "signin",
    title: "How to Sign In",
    description: "Access your account and continue watching your content.",
    icon: <LogIn className="h-6 w-6" />,
    steps: [
      {
        title: "Open Sign In Page",
        description:
          'Click the user icon in the header and select "Sign In", or navigate directly to the sign in page.',
      },
      {
        title: "Enter Your Credentials",
        description:
          "Type your registered email address and password. You can toggle password visibility using the eye icon.",
      },
      {
        title: "Stay Signed In",
        description:
          'Check the "Remember me" box if you want to stay signed in on this device. This is convenient but not recommended on shared devices.',
      },
      {
        title: "Sign In",
        description:
          'Click "Sign In" to access your account. If you forgot your password, click "Forgot password?" to reset it.',
      },
    ],
  },
  {
    id: "subscribe",
    title: "How to Subscribe & Pay",
    description: "Choose a plan and complete your payment to start watching.",
    icon: <CreditCard className="h-6 w-6" />,
    steps: [
      {
        title: "Choose Your Plan",
        description:
          "Browse the available plans on the subscription page. Plans range from a 6-hour Quick Pass (UGX 1,300) to a 2-year Mega Plan (UGX 194,000). Select the plan that suits you best.",
      },
      {
        title: "Select Payment Method",
        description:
          "Choose how you want to pay: Mobile Money (MTN MoMo, Airtel Money), Credit/Debit Card (Visa, Mastercard), Pesapal, PayPal, or Bank Transfer.",
      },
      {
        title: "Enter Payment Details",
        description:
          "For Mobile Money: Enter your phone number. For Card: Enter your card number, expiry, and CVC. For Pesapal/PayPal: You will be redirected to complete payment securely. For Bank Transfer: Use the provided account details.",
      },
      {
        title: "Complete Payment",
        description:
          'Click the "Pay" button to process your payment. For Mobile Money, you will receive a prompt on your phone to confirm. For bank transfers, send the amount with the reference number provided.',
      },
      {
        title: "Start Watching",
        description:
          "Once payment is confirmed, your subscription activates immediately. You can now access all content including films, documentaries, music, and cultural videos.",
      },
    ],
  },
]

const FAQ = [
  {
    question: "Can I use Acholiflixx on multiple devices?",
    answer:
      "Yes! You can access Acholiflixx on your phone, tablet, laptop, or smart TV. Your account works across all devices, but you can only stream on one device at a time with the basic plan.",
  },
  {
    question: "What happens when my subscription expires?",
    answer:
      "When your plan expires, you will still be able to browse content, but you will need to renew your subscription to continue watching. Your watchlist and preferences are saved.",
  },
  {
    question: "How do I pay with Mobile Money?",
    answer:
      "Select Mobile Money as your payment method, enter your MTN MoMo or Airtel Money phone number, and click Pay. You will receive a push notification on your phone to enter your PIN and confirm the payment.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We offer refunds within 24 hours of purchase if you have not streamed any content. Contact our support team at support@acholiflixx.com for refund requests.",
  },
  {
    question: "How do I become an agent?",
    answer:
      'Visit the Agent page and fill out the registration form. Our team will review your application within 24-48 hours. Once approved, you will receive your agent code and can start earning commissions.',
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. All payments are processed through secure, encrypted channels. We use trusted payment partners like Pesapal and PayPal, and we never store your card details on our servers.",
  },
  {
    question: "What content is available?",
    answer:
      "Acholiflixx features authentic Acholi films, documentaries, music videos, cultural performances, animated stories, historical content, and original series. New content is added regularly.",
  },
  {
    question: "Can I download videos for offline viewing?",
    answer:
      "Offline downloads are coming soon. Currently, all content is available for streaming. Stay tuned for updates on our download feature.",
  },
]

export default function HelpPage() {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null)

  const tutorial = TUTORIALS.find((t) => t.id === activeTutorial)

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
              <h1 className="text-lg font-bold text-foreground">Help & Tutorials</h1>
              <p className="text-xs text-muted-foreground">Learn how to use Acholiflixx</p>
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
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 text-center space-y-4 relative">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Help Center
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            How Can We Help You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Step-by-step guides to help you sign up, sign in, subscribe, and get
            the most out of Acholiflixx.
          </p>
        </div>
      </section>

      {/* Tutorial Cards */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {TUTORIALS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTutorial(activeTutorial === t.id ? null : t.id)}
              className={`text-left rounded-lg border-2 p-6 transition-all ${
                activeTutorial === t.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${
                  activeTutorial === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {t.icon}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {t.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </button>
          ))}
        </div>

        {/* Active Tutorial Steps */}
        {tutorial && (
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 mb-12 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                  {tutorial.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground font-serif">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tutorial.steps.length} steps
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTutorial(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                Close
              </Button>
            </div>

            <div className="space-y-0">
              {tutorial.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    {index < tutorial.steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border my-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA based on tutorial type */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
              {tutorial.id === "signup" && (
                <Link href="/auth/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Sign Up
                    <Play className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
              {tutorial.id === "signin" && (
                <Link href="/auth/signin">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Sign In
                    <Play className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
              {tutorial.id === "subscribe" && (
                <Link href="/subscribe">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    View Subscription Plans
                    <Play className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="bg-card/50 border-y border-border py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif">
              Frequently Asked Questions
            </h3>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-lg px-5"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center space-y-4">
          <MessageCircle className="h-8 w-8 text-primary mx-auto" />
          <h3 className="text-xl font-bold text-foreground font-serif">
            Still Need Help?
          </h3>
          <p className="text-muted-foreground">
            Our support team is here to assist you. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a href="mailto:support@acholiflixx.com">
              <Button variant="outline">
                Email Support
              </Button>
            </a>
            <a href="tel:+256700000000">
              <Button variant="outline">
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
