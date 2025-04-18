"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Edit, PlusCircle, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const budgetData = [
  { id: 1, category: "Food & Dining", limit: 500, spent: 450 },
  { id: 2, category: "Transportation", limit: 300, spent: 280 },
  { id: 3, category: "Housing", limit: 1200, spent: 1200 },
  { id: 4, category: "Utilities", limit: 200, spent: 150 },
  { id: 5, category: "Entertainment", limit: 150, spent: 120 },
  { id: 6, category: "Shopping", limit: 200, spent: 280 },
]

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

export default function BudgetPage() {
  const [budgets, setBudgets] = useState(budgetData)
  const [editingBudget, setEditingBudget] = useState(null)
  const [newBudget, setNewBudget] = useState({ category: "", limit: 0 })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const percentSpent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0

  const handleEditBudget = (budget) => {
    setEditingBudget(budget)
    setNewBudget({ category: budget.category, limit: budget.limit })
    setIsEditMode(true)
    setDialogOpen(true)
  }

  const handleAddBudget = () => {
    setNewBudget({ category: "", limit: 0 })
    setIsEditMode(false)
    setDialogOpen(true)
  }

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
  }

  const handleSaveBudget = () => {
    if (isEditMode) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === editingBudget.id
            ? { ...budget, category: newBudget.category, limit: Number(newBudget.limit) }
            : budget,
        ),
      )
    } else {
      const newId = Math.max(0, ...budgets.map((b) => b.id)) + 1
      setBudgets([...budgets, { id: newId, category: newBudget.category, limit: Number(newBudget.limit), spent: 0 }])
    }
    setDialogOpen(false)
  }

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget</h1>
        <Button className="gap-1" onClick={handleAddBudget}>
          <PlusCircle className="h-4 w-4" /> Add Budget
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Monthly Budget Overview</CardTitle>
            <CardDescription>
              Total Budget: ${totalBudget.toFixed(2)} • Spent: ${totalSpent.toFixed(2)} • Remaining: $
              {(totalBudget - totalSpent).toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{percentSpent}%</span>
                </div>
                <Progress value={percentSpent} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Budget Alerts</CardTitle>
            <CardDescription>Notifications about your budgets</CardDescription>
          </CardHeader>
          <CardContent>
            {budgets.some((budget) => budget.spent > budget.limit) ? (
              <Alert className="bg-destructive/15 border-destructive">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle className="text-destructive font-medium">Budget Exceeded</AlertTitle>
                <AlertDescription className="text-destructive text-sm">
                  <div className="mt-2 space-y-2">
                    {budgets
                      .filter((budget) => budget.spent > budget.limit)
                      .map((budget) => (
                        <div key={budget.id} className="flex justify-between items-center">
                          <span>{budget.category}:</span>
                          <span>
                            ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                            <span className="ml-2 text-xs">(${(budget.spent - budget.limit).toFixed(2)} over)</span>
                          </span>
                        </div>
                      ))}
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="text-sm text-muted-foreground py-4 text-center">All budgets are within limits.</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>Manage your monthly budget limits by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget Limit</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => {
                const percentUsed = Math.round((budget.spent / budget.limit) * 100)
                const isOverBudget = budget.spent > budget.limit

                return (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">{budget.category}</TableCell>
                    <TableCell>${budget.limit.toFixed(2)}</TableCell>
                    <TableCell>${budget.spent.toFixed(2)}</TableCell>
                    <TableCell className={isOverBudget ? "text-destructive" : ""}>
                      ${(budget.limit - budget.spent).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={percentUsed > 100 ? 100 : percentUsed}
                          className={`h-2 ${isOverBudget ? "bg-destructive/30" : ""}`}
                          indicatorClassName={isOverBudget ? "bg-destructive" : undefined}
                        />
                        <span className="text-sm">{percentUsed}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditBudget(budget)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteBudget(budget.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {budgets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No budgets set. Click &quot;Add Budget&quot; to create your first budget.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Budget Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Budget" : "Add New Budget"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update your budget limit for this category"
                : "Set a monthly spending limit for a category"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newBudget.category}
                onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                disabled={isEditMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => !isEditMode && !budgets.some((b) => b.category === cat))
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="limit">Budget Limit ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[Number(newBudget.limit)]}
                  min={0}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setNewBudget({ ...newBudget, limit: value[0] })}
                />
                <Input
                  id="limit"
                  type="number"
                  className="w-24"
                  min={0}
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveBudget}>
              {isEditMode ? "Save Changes" : "Add Budget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
