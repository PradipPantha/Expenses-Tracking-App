"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"]

export default function SetDefaultCategory() {
  const [defaultCategory, setDefaultCategory] = useState<string | undefined>()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("defaultCategory")
      if (stored) setDefaultCategory(stored)
    }
  }, [])

  const handleSave = (category: string) => {
    localStorage.setItem("defaultCategory", category)
    setDefaultCategory(category)
    setSaved(true)

    setTimeout(() => setSaved(false), 2000) // show confirmation briefly
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Default Expense Category</Label>
      <Select value={defaultCategory || ""} onValueChange={handleSave}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {saved && (
        <p className="flex items-center text-sm text-green-600">
          <Check className="w-4 h-4 mr-1" /> Default category saved!
        </p>
      )}
    </div>
  )
}

