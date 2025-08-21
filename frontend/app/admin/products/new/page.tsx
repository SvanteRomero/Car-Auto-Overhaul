"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Upload } from "lucide-react"

const categories = ["Engine Parts", "Brake System", "Suspension", "Electrical", "Filters", "Body Parts"]
const carMakes = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "Mitsubishi",
  "Subaru",
  "Isuzu",
  "Suzuki",
  "BMW",
  "Mercedes",
  "Audi",
  "Volkswagen",
]

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    specifications: "",
    compatibleMakes: [] as string[],
    status: "active",
    images: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMakeToggle = (make: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      compatibleMakes: checked ? [...prev.compatibleMakes, make] : prev.compatibleMakes.filter((m) => m !== make),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Creating product:", formData)
    setIsLoading(false)
    router.push("/admin/products")
  }

  const generateSKU = () => {
    const prefix = formData.category
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    setFormData((prev) => ({ ...prev, sku: `${prefix}-${random}` }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/products" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-1">Create a new product in your catalog</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Product Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="sku"
                          value={formData.sku}
                          onChange={(e) => handleInputChange("sku", e.target.value)}
                          placeholder="Product SKU"
                          required
                        />
                        <Button type="button" variant="outline" onClick={generateSKU}>
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (TSh) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Product description..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications">Specifications</Label>
                    <Textarea
                      id="specifications"
                      value={formData.specifications}
                      onChange={(e) => handleInputChange("specifications", e.target.value)}
                      placeholder="Technical specifications..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Compatible Car Makes */}
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Compatibility</CardTitle>
                  <CardDescription>Select compatible car makes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {carMakes.map((make) => (
                      <div key={make} className="flex items-center space-x-2">
                        <Checkbox
                          id={make}
                          checked={formData.compatibleMakes.includes(make)}
                          onCheckedChange={(checked) => handleMakeToggle(make, checked as boolean)}
                        />
                        <Label htmlFor={make} className="text-sm">
                          {make}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.compatibleMakes.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Selected makes:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.compatibleMakes.map((make) => (
                          <Badge key={make} variant="secondary">
                            {make}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload product photos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop images here</p>
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 800x800px, JPG or PNG, max 5MB per image</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Product..." : "Create Product"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/admin/products">Cancel</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              {formData.name && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{formData.name}</h3>
                      {formData.sku && <p className="text-sm text-gray-600">SKU: {formData.sku}</p>}
                      {formData.category && <Badge variant="secondary">{formData.category}</Badge>}
                      {formData.price && (
                        <p className="text-lg font-bold text-blue-600">
                          TSh {Number.parseInt(formData.price).toLocaleString()}
                        </p>
                      )}
                      {formData.stock && <p className="text-sm">Stock: {formData.stock} units</p>}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
