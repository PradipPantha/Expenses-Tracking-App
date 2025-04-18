"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { BellRing, Moon, Sun, Palette, Wallet, SettingsIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    weeklyReports: true,
    expenseReminders: false,
  })

  // App preferences
  const [preferences, setPreferences] = useState({
    defaultExpenseCategory: "Food & Dining",
    defaultIncomeCategory: "Salary",
    currency: "USD",
  })

  // Toggle notification setting
  const toggleNotification = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })

    toast({
      title: "Settings updated",
      description: `${setting} has been ${!notificationSettings[setting] ? "enabled" : "disabled"}.`,
    })
  }

  // Save preferences
  const savePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your application preferences have been updated.",
    })
  }

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the application looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="theme-mode">Theme Mode</Label>
                <span className="text-sm text-muted-foreground">Switch between light and dark mode</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  id="theme-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <Label>Currency Display</Label>
                <span className="text-sm text-muted-foreground">Choose your preferred currency</span>
              </div>
              <Select
                value={preferences.currency}
                onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications about your account</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => toggleNotification("emailNotifications")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when you're approaching budget limits</p>
              </div>
              <Switch
                checked={notificationSettings.budgetAlerts}
                onCheckedChange={() => toggleNotification("budgetAlerts")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly summaries of your finances</p>
              </div>
              <Switch
                checked={notificationSettings.weeklyReports}
                onCheckedChange={() => toggleNotification("weeklyReports")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Expense Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminders about recurring expenses</p>
              </div>
              <Switch
                checked={notificationSettings.expenseReminders}
                onCheckedChange={() => toggleNotification("expenseReminders")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Default Categories
          </CardTitle>
          <CardDescription>Set your preferred default categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="default-expense">Default Expense Category</Label>
              <Select
                value={preferences.defaultExpenseCategory}
                onValueChange={(value) => setPreferences({ ...preferences, defaultExpenseCategory: value })}
              >
                <SelectTrigger id="default-expense">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-income">Default Income Category</Label>
              <Select
                value={preferences.defaultIncomeCategory}
                onValueChange={(value) => setPreferences({ ...preferences, defaultIncomeCategory: value })}
              >
                <SelectTrigger id="default-income">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Investments">Investments</SelectItem>
                  <SelectItem value="Gifts">Gifts</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={savePreferences}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Advanced
          </CardTitle>
          <CardDescription>Advanced application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Export</Label>
              <p className="text-sm text-muted-foreground">Export all your data as CSV or JSON</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                CSV
              </Button>
              <Button variant="outline" size="sm">
                JSON
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Clear All Data</Label>
              <p className="text-sm text-muted-foreground">Delete all your data from the application</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast({
                  title: "Are you sure?",
                  description: "This action cannot be undone. This will permanently delete all your data.",
                  variant: "destructive",
                })
              }}
            >
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
