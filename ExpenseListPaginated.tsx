"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Expense {
  amount: number
  category: string
  date: string
}

const initialExpenses: Expense[] = Array.from({ length: 53 }, (_, i) => ({
  amount: Math.floor(Math.random() * 200),
  category: ["Food", "Travel", "Shopping", "Bills"][i % 4],
  date: `2025-03-${(i % 30) + 1 < 10 ? '0' : ''}${(i % 30) + 1}T10:00:00Z`,
}))

const ITEMS_PER_PAGE = 10

export default function ExpenseListPaginated() {
  const [expenses] = useState<Expense[]>(initialExpenses)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentExpenses = expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Expense List (Paginated)</h2>
      <ul className="space-y-2">
        {currentExpenses.map((expense, index) => (
          <li key={index} className="flex justify-between items-center p-2 border rounded">
            <span>{expense.category} - ${expense.amount}</span>
            <span className="text-gray-500 text-sm">{new Date(expense.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-4">
        <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}
