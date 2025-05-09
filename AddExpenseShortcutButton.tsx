"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

const categories = ["Food", "Travel", "Shopping", "Bills", "Other"]

export default function AddExpenseShortcutButton() {
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount.")
      return
    }

    if (!category) {
      alert("Please select a category.")
      return
    }

    const expense = {
      amount: parsedAmount,
      category,
      date: new Date().toISOString(),
    }

    console.log("Expense added:", expense)

    // Clear form and close modal
    setAmount("")
    setCategory("")
    setShowModal(false)
  }

  return (
    <div>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-10 right-10">
        <Button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 rounded-full p-4 text-white text-2xl shadow-lg hover:bg-blue-700"
          aria-label="Add new expense"
        >
          +
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Add Expense</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="0.00"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-2">
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
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Add Expense
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
