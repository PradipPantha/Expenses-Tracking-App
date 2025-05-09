"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'  // Make sure to import toast for notifications

interface Expense {
  amount: number
  category: string
  date: string
}

const initialExpenses: Expense[] = [
  { amount: 100, category: "Food", date: "2025-01-10T10:00:00Z" },
  { amount: 50, category: "Travel", date: "2025-01-15T10:00:00Z" },
  { amount: 150, category: "Shopping", date: "2025-02-20T10:00:00Z" },
]

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedExpenseIndex, setSelectedExpenseIndex] = useState<number | null>(null)
  const [filteredCategory, setFilteredCategory] = useState<string>("")  // Filter state for category

  const handleDelete = (index: number) => {
    setSelectedExpenseIndex(index)
    setShowConfirm(true) // Show confirmation dialog
  }

  const confirmDelete = () => {
    if (selectedExpenseIndex !== null) {
      const newExpenses = expenses.filter((_, index) => index !== selectedExpenseIndex)
      setExpenses(newExpenses) // Remove expense from list
      toast.success("Expense deleted successfully!") // Corrected the toast call
    }
    setShowConfirm(false) // Close confirmation dialog
    setSelectedExpenseIndex(null) // Reset selected expense
  }

  const cancelDelete = () => {
    setSelectedExpenseIndex(null)
    setShowConfirm(false) // Close confirmation dialog
  }

  // Function to filter expenses by category
  const filterByCategory = (category: string) => {
    setFilteredCategory(category)
  }

  // Filtered expenses based on category
  const filteredExpenses = filteredCategory
    ? expenses.filter((expense) => expense.category === filteredCategory)
    : expenses

  // Calculate the total amount of expenses
  const getTotalAmount = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Expense List</h2>

      {/* Filter options */}
      <div>
        <Button onClick={() => filterByCategory("Food")} className="bg-blue-500 text-white">Food</Button>
        <Button onClick={() => filterByCategory("Travel")} className="bg-blue-500 text-white">Travel</Button>
        <Button onClick={() => filterByCategory("Shopping")} className="bg-blue-500 text-white">Shopping</Button>
        <Button onClick={() => filterByCategory("")} className="bg-blue-500 text-white">All</Button>
      </div>

      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{expense.category} - ${expense.amount}</span>
            <Button onClick={() => handleDelete(index)} className="bg-red-500 text-white">Delete</Button>
          </li>
        ))}
      </ul>

      {/* Total amount */}
      <div className="mt-4">
        <strong>Total: ${getTotalAmount()}</strong>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this expense?</h3>
            <div className="mt-4 flex justify-end space-x-4">
              <Button onClick={cancelDelete} className="bg-gray-400 text-white">Cancel</Button>
              <Button onClick={confirmDelete} className="bg-red-500 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
