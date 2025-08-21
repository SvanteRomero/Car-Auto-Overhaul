"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: productId,
    name: "Toyota Hilux Brake Pads - Front Set",
    partNumber: "BP-TH-2015-F",
    category: "Brake System",
    price: 85000,
    originalPrice: 95000,
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 24,
    images: [
      "/brake-pads-auto-parts.png",
      "/placeholder.svg?height=400&width=400&text=Brake+Pads+Side+View",
      "/placeholder.svg?height=400&width=400&text=Brake+Pads+Package",
      "/placeholder.svg?height=400&width=400&text=Installation+Guide",
    ],
    description: `High-quality brake pads designed specifically for Toyota Hilux models. These premium brake pads offer superior stopping power, reduced noise, and extended durability. Manufactured to OEM specifications using advanced friction materials that provide consistent performance in all weather conditions.

Features:
• Premium ceramic friction material for quiet operation
• Excellent heat dissipation for fade resistance
• Low dust formula keeps wheels cleaner
• Chamfered edges and slots reduce noise and vibration
• Includes all necessary hardware and shims
• Meets or exceeds OEM performance standards`,
    specifications: [
      { label: "Material", value: "Ceramic Composite" },
      { label: "Position", value: "Front Axle" },
      { label: "Thickness", value: "17.5mm" },
      { label: "Width", value: "131.5mm" },
      { label: "Height", value: "58.3mm" },
      { label: "Warranty", value: "12 months / 20,000 km" },
    ],
    compatibility: [
      "Toyota Hilux (2015-2024) - All variants",
      "Toyota Hilux Revo (2015-2020)",
      "Toyota Hilux GR Sport (2019-2024)",
      "Toyota Fortuner (2015-2020) - 2WD/4WD",
    ],
    features: [
      {
        icon: Shield,
        title: "12 Month Warranty",
        description: "Full warranty coverage with hassle-free replacement",
      },
      {
        icon: Truck,
        title: "Fast Delivery",
        description: "Same-day delivery in Dar es Salaam",
      },
      {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "30-day return policy for unused items",
      },
    ],
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Added ${quantity} x ${product.name} to cart`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <span>/</span>
        <Link href={`/categories/${product.category.toLowerCase().replace(" ", "-")}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Link href="/products">
        <Button variant="ghost" className="mb-6 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href={`/categories/${product.category.toLowerCase().replace(" ", "-")}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                  {product.category}
                </Badge>
              </Link>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">Part Number: {product.partNumber}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">TSh {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  TSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.inStock && (
              <p className="text-sm text-green-600 font-medium">{product.stockCount} units available</p>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="quantity" className="font-medium">
                Quantity:
              </Label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(product.stockCount, Number.parseInt(e.target.value) || 1)))
                  }
                  className="w-20 text-center border-0 focus-visible:ring-0"
                  min="1"
                  max={product.stockCount}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full h-12 text-lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? `Add to Cart - TSh ${(product.price * quantity).toLocaleString()}` : "Out of Stock"}
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
            {product.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-foreground">{product.description}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center py-3">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                      {index < product.specifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compatibility" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Compatible Vehicles</h3>
                <div className="space-y-3">
                  {product.compatibility.map((vehicle, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{vehicle}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Please verify compatibility with your specific vehicle model and year before
                    purchasing. Contact our support team if you need assistance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
