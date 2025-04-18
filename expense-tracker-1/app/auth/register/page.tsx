"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")

  const checkPasswordStrength = (password) => {
    let strength = 0
    const feedback = []

    // Length check
    if (password.length >= 8) {
      strength += 1
    } else {
      feedback.push("Password should be at least 8 characters")
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 1
    } else {
      feedback.push("Include at least one uppercase letter")
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 1
    } else {
      feedback.push("Include at least one lowercase letter")
    }

    // Number check
    if (/[0-9]/.test(password)) {
      strength += 1
    } else {
      feedback.push("Include at least one number")
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1
    } else {
      feedback.push("Include at least one special character")
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback.join(", "))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you would call your Django backend API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // })

      // Simulate registration for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/auth/login?registered=true")
    } catch (error) {
      console.error("Registration failed:", error)
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  checkPasswordStrength(e.target.value)
                }}
                required
              />
            </div>
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-full rounded-full ${
                      i < passwordStrength
                        ? passwordStrength < 3
                          ? "bg-destructive"
                          : passwordStrength < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              {password && (
                <p
                  className={`text-xs ${
                    passwordStrength < 3
                      ? "text-destructive"
                      : passwordStrength < 4
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {passwordStrength < 3
                    ? "Weak password"
                    : passwordStrength < 4
                      ? "Moderate password"
                      : "Strong password"}
                  {passwordFeedback && passwordStrength < 5 && (
                    <span className="block mt-1 text-muted-foreground">Tip: {passwordFeedback}</span>
                  )}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
