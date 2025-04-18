"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, UploadCloud, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Categories from the requirements
const categories = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Personal Care",
  "Education",
  "Travel",
  "Gifts & Donations",
  "Other",
]

export default function AddExpensePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState("")
  const [receipt, setReceipt] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setReceipt(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send data to your Django backend
      // const formData = new FormData()
      // formData.append('name', name)
      // formData.append('amount', amount)
      // formData.append('category', category)
      // formData.append('date', format(date, 'yyyy-MM-dd'))
      // formData.append('notes', notes)
      // if (receipt) formData.append('receipt', receipt)

      // const response = await fetch('/api/expenses', {
      //   method: 'POST',
      //   body: formData,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/dashboard/expenses")
    } catch (error) {
      console.error("Error adding expense:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Expense</h1>
        <p className="text-muted-foreground">Record a new expense with details</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>Fill in the information about your expense</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Expense Name</Label>
              <Input
                id="name"
                placeholder="E.g., Grocery Shopping"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt (Optional)</Label>
              <div className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <label
                  htmlFor="receipt-upload"
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  {receiptPreview ? (
                    <div className="relative w-full">
                      <img
                        src={receiptPreview || "/placeholder.svg"}
                        alt="Receipt preview"
                        className="max-h-48 object-contain mx-auto rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 bg-background rounded-full m-1"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setReceipt(null)
                          setReceiptPreview(null)
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (max. 5MB)</p>
                    </>
                  )}
                  <Input
                    id="receipt-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,application/pdf"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details about this expense"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/expenses")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save Expense"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
