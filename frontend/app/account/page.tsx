"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { User, Package, Calendar, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: number
  trackingNumber?: string
}

interface UserProfile {
  fullName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "John Mwalimu",
    email: "john.mwalimu@email.com",
    phone: "+255 123 456 789",
    address: {
      street: "123 Uhuru Street",
      city: "Dar es Salaam",
      region: "Dar es Salaam",
      postalCode: "12345",
      country: "Tanzania",
    },
  })

  const [editProfile, setEditProfile] = useState<UserProfile>(userProfile)

  // Mock order data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      total: 205000,
      status: "delivered",
      items: 3,
      trackingNumber: "TZ123456789",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      total: 85000,
      status: "shipped",
      items: 1,
      trackingNumber: "TZ987654321",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      total: 145000,
      status: "processing",
      items: 2,
    },
    {
      id: "ORD-2023-045",
      date: "2023-12-20",
      total: 320000,
      status: "delivered",
      items: 5,
      trackingNumber: "TZ456789123",
    },
    {
      id: "ORD-2023-044",
      date: "2023-12-15",
      total: 75000,
      status: "cancelled",
      items: 1,
    },
  ]

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const handleProfileUpdate = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setUserProfile(editProfile)
      setIsEditing(false)
      setIsSaving(false)
    }, 1500)
  }

  const handleCancelEdit = () => {
    setEditProfile(userProfile)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4 pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Manage your orders and profile information</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-96">
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Order History</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
        </TabsList>

        {/* Order History Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Tracking</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>{order.items} items</TableCell>
                            <TableCell>TSh {order.total.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                            </TableCell>
                            <TableCell>
                              {order.trackingNumber ? (
                                <span className="text-sm text-muted-foreground">{order.trackingNumber}</span>
                              ) : (
                                <span className="text-sm text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Link href={`/account/orders/${order.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Items:</span>
                            <span>{order.items}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total:</span>
                            <span className="font-medium">TSh {order.total.toLocaleString()}</span>
                          </div>
                          {order.trackingNumber && (
                            <div className="flex justify-between text-sm">
                              <span>Tracking:</span>
                              <span className="text-muted-foreground">{order.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                        <Separator className="my-3" />
                        <Link href={`/account/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                  <Link href="/products">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and shipping address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={isEditing ? editProfile.fullName : userProfile.fullName}
                      onChange={(e) => isEditing && setEditProfile({ ...editProfile, fullName: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editProfile.email : userProfile.email}
                      onChange={(e) => isEditing && setEditProfile({ ...editProfile, email: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editProfile.phone : userProfile.phone}
                      onChange={(e) => isEditing && setEditProfile({ ...editProfile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Textarea
                      id="street"
                      value={isEditing ? editProfile.address.street : userProfile.address.street}
                      onChange={(e) =>
                        isEditing &&
                        setEditProfile({
                          ...editProfile,
                          address: { ...editProfile.address, street: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={isEditing ? editProfile.address.city : userProfile.address.city}
                      onChange={(e) =>
                        isEditing &&
                        setEditProfile({
                          ...editProfile,
                          address: { ...editProfile.address, city: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={isEditing ? editProfile.address.region : userProfile.address.region}
                      onChange={(e) =>
                        isEditing &&
                        setEditProfile({
                          ...editProfile,
                          address: { ...editProfile.address, region: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={isEditing ? editProfile.address.postalCode : userProfile.address.postalCode}
                      onChange={(e) =>
                        isEditing &&
                        setEditProfile({
                          ...editProfile,
                          address: { ...editProfile.address, postalCode: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={isEditing ? editProfile.address.country : userProfile.address.country}
                      onChange={(e) =>
                        isEditing &&
                        setEditProfile({
                          ...editProfile,
                          address: { ...editProfile.address, country: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <>
                    <Button onClick={handleProfileUpdate} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving} className="bg-transparent">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
