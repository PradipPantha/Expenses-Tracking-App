"use client"

import { useEffect, useState } from "react"

type Expense = {
  category: string
  amount: number
}

export default function Top3Categories() {
  const [topCategories, setTopCategories] = useState<{ category: string, total: number }[]>([])

  useEffect(() => {
    // Replace with real data (e.g. from context, props, or localStorage)
    const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]")

    const totals: Record<string, number> = {}

    expenses.forEach((exp) => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount
    })

    const sorted = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, total]) => ({ category, total }))

    setTopCategories(sorted)
  }, [])

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Top 3 Spending Categories</h2>
      <ul className="list-disc ml-5">
        {topCategories.map((item) => (
          <li key={item.category}>
            {item.category}: ₹{item.total}
          </li>
        ))}
      </ul>
    </div>
  )
}
