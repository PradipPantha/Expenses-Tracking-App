"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, PlusCircle, CalendarIcon, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const incomeData = [
  {
    id: 1,
    name: "Salary",
    source: "Primary Job",
    amount: 3500.0,
    date: new Date(2023, 5, 10),
  },
  {
    id: 2,
    name: "Freelance Work",
    source: "Side Gig",
    amount: 750.0,
    date: new Date(2023, 5, 15),
  },
  {
    id: 3,
    name: "Interest",
    source: "Savings Account",
    amount: 45.5,
    date: new Date(2023, 5, 20),
  },
  {
    id: 4,
    name: "Dividend",
    source: "Investments",
    amount: 120.75,
    date: new Date(2023, 5, 22),
  },
  {
    id: 5,
    name: "Gift",
    source: "Personal",
    amount: 200.0,
    date: new Date(2023, 5, 25),
  },
]

const sources = ["All Sources", "Primary Job", "Side Gig", "Investments", "Savings Account", "Personal", "Other"]

export default function IncomePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSource, setSelectedSource] = useState("All Sources")

  // Filter income entries based on search, source, and date
  const filteredIncome = incomeData.filter((income) => {
    const matchesSearch = income.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = selectedSource === "All Sources" || income.source === selectedSource
    const matchesDate = !date || format(income.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesSource && matchesDate
  })

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Income</h1>
        <Link href="/dashboard/income/add">
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" /> Add Income
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search income..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[220px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            {(date || selectedSource !== "All Sources" || searchTerm) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setDate(undefined)
                  setSelectedSource("All Sources")
                  setSearchTerm("")
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Income Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Income</CardTitle>
          <CardDescription>
            {filteredIncome.length} entries found • Total: $
            {filteredIncome.reduce((sum, income) => sum + income.amount, 0).toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncome.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{income.source}</Badge>
                  </TableCell>
                  <TableCell>{format(income.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-right">${income.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredIncome.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No income entries found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
