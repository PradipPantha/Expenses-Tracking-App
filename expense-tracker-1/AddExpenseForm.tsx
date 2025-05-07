"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"]

export default function AddExpenseForm() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<string>("")

  useEffect(() => {
    const stored = localStorage.getItem("defaultCategory")
    if (stored) {
      setCategory(stored) // Set the category from localStorage
    } else {
      setCategory(categories[0]) // Fallback to first category if no default set
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", { amount, category })
    // Save to backend or state
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Amount</Label>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <Label>Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Expense</Button>
    </form>
  )
}
