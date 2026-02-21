"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  CreditCard,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Clock,
  Crown,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type PlanId = string

interface Plan {
  id: PlanId
  price: number
  label: string
  validity: string
  popular?: boolean
  bestValue?: boolean
  savings?: string
}

const PLANS: Plan[] = [
  { id: "6hrs", price: 1300, label: "Quick Pass", validity: "6 hours" },
  { id: "8hrs", price: 2000, label: "Day Pass", validity: "8 hours" },
  { id: "2days", price: 3400, label: "Weekend", validity: "2 days" },
  { id: "1week", price: 7500, label: "Weekly", validity: "1 week", popular: true },
  { id: "3weeks", price: 15000, label: "Bi-Weekly+", validity: "3 weeks", savings: "Save 33%" },
  { id: "1month", price: 42500, label: "Monthly", validity: "1 month" },
  { id: "3months", price: 83000, label: "Quarterly", validity: "3 months", savings: "Save 35%" },
  { id: "1year", price: 100000, label: "Annual", validity: "1 year", bestValue: true, savings: "Save 80%" },
  { id: "2years", price: 194000, label: "Mega Plan", validity: "2 years", savings: "Save 81%" },
]

type PaymentMethod = "card" | "mobile-money" | "pesapal" | "paypal" | "crypto" | "bank"

interface PaymentOption {
  id: PaymentMethod
  name: string
  description: string
  icon: React.ReactNode
}

const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "MTN MoMo, Airtel Money",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "pesapal",
    name: "Pesapal",
    description: "Multiple payment options",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "International payments",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct bank deposit",
    icon: <CreditCard className="h-5 w-5" />,
  },
]

function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString()}`
}

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phone, setPhone] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const plan = PLANS.find((p) => p.id === selectedPlan)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 2500))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete && plan) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground font-serif">
            Subscription Activated!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Your <span className="text-foreground font-medium">{plan.label}</span> plan
            ({plan.validity}) is now active. Enjoy unlimited access to all Acholi content.
          </p>
          <div className="bg-card rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Amount paid</p>
            <p className="text-2xl font-bold text-primary">{formatUGX(plan.price)}</p>
            <p className="text-sm text-muted-foreground">Valid for {plan.validity}</p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/browse">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Start Watching
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
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
              <h1 className="text-lg font-bold text-foreground">Choose Your Plan</h1>
              <p className="text-xs text-muted-foreground">
                Step {step} of 3
              </p>
            </div>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">ACHOLI</span>
            <span className="text-xl font-bold text-foreground">FLIXX</span>
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary h-1">
        <div
          className="h-1 bg-primary transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Step 1: Select Plan */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif text-balance">
                Unlock the Best of Acholi Content
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose a plan that works for you. All plans include unlimited access
                to films, documentaries, music, and cultural content.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" /> HD Streaming
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" /> No Ads
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-primary" /> All Devices
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> Cancel Anytime
              </span>
            </div>

            {/* Plans grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative text-left rounded-lg border-2 p-5 transition-all ${
                    selectedPlan === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    {p.popular && (
                      <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0">
                        Popular
                      </Badge>
                    )}
                    {p.bestValue && (
                      <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0">
                        Best Value
                      </Badge>
                    )}
                    {p.savings && !p.popular && !p.bestValue && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        {p.savings}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-medium text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {formatUGX(p.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Valid for {p.validity}
                  </p>

                  {/* Selected indicator */}
                  {selectedPlan === p.id && (
                    <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={() => selectedPlan && setStep(2)}
                disabled={!selectedPlan}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
                size="lg"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && plan && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                Select Payment Method
              </h2>
              <p className="text-muted-foreground">
                {plan.label} &mdash; {formatUGX(plan.price)} for {plan.validity}
              </p>
            </div>

            <div className="max-w-lg mx-auto space-y-3">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPayment === pm.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedPayment === pm.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {pm.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {pm.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pm.description}
                    </p>
                  </div>
                  {selectedPayment === pm.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => selectedPayment && setStep(3)}
                disabled={!selectedPayment}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
                size="lg"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && plan && selectedPayment && (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground font-serif">
                Complete Payment
              </h2>
            </div>

            {/* Order summary */}
            <div className="bg-card rounded-lg border border-border p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm text-foreground font-medium">
                  {plan.label} ({plan.validity})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment via</span>
                <span className="text-sm text-foreground font-medium">
                  {PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.name}
                </span>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatUGX(plan.price)}
                </span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-5">
              {/* Mobile Money Form */}
              {selectedPayment === "mobile-money" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 0771234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your MTN MoMo or Airtel Money number
                    </p>
                  </div>
                </div>
              )}

              {/* Card Form */}
              {selectedPayment === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="bg-secondary border-border"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="bg-secondary border-border"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pesapal Form */}
              {selectedPayment === "pesapal" && (
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to Pesapal&apos;s secure payment gateway to
                      complete your payment.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesapal-email">Email Address</Label>
                    <Input
                      id="pesapal-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>
              )}

              {/* PayPal Form */}
              {selectedPayment === "paypal" && (
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to PayPal to securely complete your payment.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-email">PayPal Email</Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      placeholder="your@paypal.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {selectedPayment === "bank" && (
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                      Bank Transfer Details
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Bank</span>
                        <span className="text-foreground">Stanbic Bank Uganda</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Account</span>
                        <span className="text-foreground">9030012345678</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="text-foreground">Acholiflixx Ltd</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Reference</span>
                        <span className="text-foreground font-mono">
                          AF-{plan.id.toUpperCase()}-{Date.now().toString(36).slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-email">Your Email (for confirmation)</Label>
                    <Input
                      id="bank-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay ${formatUGX(plan.price)}`}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Payments are secure and encrypted
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
