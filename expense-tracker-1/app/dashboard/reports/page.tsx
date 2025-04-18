"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDown } from "lucide-react"
import { ChartContainer, ChartTooltip, BarChart, PieChart } from "@/components/ui/chart"
import { useToast } from "@/hooks/use-toast"

// Mock data
const monthlyData = [
  { month: "Jan", expenses: 2200, income: 4000 },
  { month: "Feb", expenses: 2100, income: 4100 },
  { month: "Mar", expenses: 2400, income: 4200 },
  { month: "Apr", expenses: 1800, income: 4000 },
  { month: "May", expenses: 2800, income: 4500 },
  { month: "Jun", expenses: 2600, income: 4300 },
]

const categoryData = [
  { name: "Food & Dining", value: 1250 },
  { name: "Housing", value: 950 },
  { name: "Transportation", value: 570 },
  { name: "Utilities", value: 420 },
  { name: "Entertainment", value: 380 },
  { name: "Healthcare", value: 320 },
  { name: "Shopping", value: 280 },
  { name: "Other", value: 210 },
]

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function ReportsPage() {
  const { toast } = useToast()
  const [timeFrame, setTimeFrame] = useState("6months")
  const [reportType, setReportType] = useState("expenses_vs_income")
  const [year, setYear] = useState("2023")

  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = ["Date", "Category", "Description", "Amount"]

    // Convert monthly data to CSV rows
    const csvRows = [
      headers.join(","),
      ...monthlyData.map((item) =>
        [`2023-${item.month}-01`, "Mixed", `${item.month} Summary`, item.expenses].join(","),
      ),
    ]

    // Create a blob and download link
    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    // Create a link and trigger download
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `expense_report_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message
    toast({
      title: "Report Downloaded",
      description: "Your expense report has been downloaded as a CSV file.",
    })
  }

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports & Visualizations</h1>
        <Button className="gap-1" onClick={handleDownloadCSV}>
          <FileDown className="h-4 w-4" /> Download CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Full Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="expenses_vs_income" value={reportType} onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses_vs_income">Income vs Expenses</TabsTrigger>
          <TabsTrigger value="category_breakdown">Category Breakdown</TabsTrigger>
          <TabsTrigger value="monthly_comparison">Monthly Comparison</TabsTrigger>
        </TabsList>

        {/* Income vs Expenses */}
        <TabsContent value="expenses_vs_income">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Compare your income and expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <ChartTooltip />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Breakdown */}
        <TabsContent value="category_breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Breakdown of spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <PieChart data={categoryData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <ChartTooltip />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                    <div className="text-sm">
                      {category.name}: ${category.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Monthly Comparison */}
        <TabsContent value="monthly_comparison">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Comparison</CardTitle>
              <CardDescription>Compare expenses across different months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <ChartTooltip />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
