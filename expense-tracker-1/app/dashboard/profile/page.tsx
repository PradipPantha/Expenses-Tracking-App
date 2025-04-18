"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Loader2, Mail, User, Lock, Eye, EyeOff, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: userData.name,
    email: userData.email,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleProfileUpdate(e) {
    e.preventDefault()
    setIsUpdating(true)

    try {
      // In a real implementation, you would call your Django backend API
      // const formData = new FormData();
      // formData.append('name', profileForm.name);
      // formData.append('email', profileForm.email);
      // if (avatarFile) {
      //   formData.append('avatar', avatarFile);
      // }

      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   body: formData,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUserData({
        ...userData,
        name: profileForm.name,
        email: profileForm.email,
        avatar: avatarPreview || userData.avatar,
      })

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your new password and confirmation match.",
        variant: "destructive",
      })
      return
    }

    setIsUpdating(true)

    try {
      // In a real implementation, you would call your Django backend API
      // const response = await fetch('/api/profile/password', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: passwordForm.currentPassword,
      //     newPassword: passwordForm.newPassword
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your password.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* User Avatar Card */}
        <Card className="md:max-w-[300px]">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarPreview || userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </label>
              <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-medium text-lg">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <div className="flex-1">
          <Tabs defaultValue="account">
            <TabsList className="mb-4">
              <TabsTrigger value="account">Account Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Account Info */}
            <TabsContent value="account">
              <Card>
                <form onSubmit={handleProfileUpdate}>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account details here</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className="pl-8"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-8"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card>
                <form onSubmit={handlePasswordUpdate}>
                  <CardHeader>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-8"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2.5 top-2.5 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-8"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-8"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isUpdating ? "Updating..." : "Update Password"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
