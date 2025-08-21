"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ShoppingCart, Star } from "lucide-react"

// Category mapping
const categoryMap: Record<string, { name: string; description: string; icon: string }> = {
  engine: { name: "Engine Parts", description: "Complete engine components and accessories", icon: "🔧" },
  brakes: { name: "Brake System", description: "Brake pads, discs, and brake system components", icon: "🛑" },
  suspension: { name: "Suspension", description: "Shocks, struts, and suspension components", icon: "🚗" },
  electrical: { name: "Electrical", description: "Batteries, alternators, and electrical parts", icon: "⚡" },
  filters: { name: "Filters", description: "Air, oil, and fuel filters for all vehicles", icon: "🔍" },
  body: { name: "Body Parts", description: "Exterior and interior body components", icon: "🚙" },
}

// Mock products data
const allProducts = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    price: 45000,
    category: "Brake System",
    image: "/brake-pads-close-up.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Engine Oil Filter",
    price: 12000,
    category: "Filters",
    image: "/oil-filter.png",
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Shock Absorber Front",
    price: 85000,
    category: "Suspension",
    image: "/shock-absorber.png",
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Car Battery 12V",
    price: 120000,
    category: "Electrical",
    image: "/car-battery.png",
    rating: 4.5,
    reviews: 203,
    inStock: true,
  },
  {
    id: 5,
    name: "Air Filter Element",
    price: 18000,
    category: "Filters",
    image: "/air-filter.png",
    rating: 4.4,
    reviews: 67,
    inStock: true,
  },
  {
    id: 6,
    name: "Timing Belt Kit",
    price: 95000,
    category: "Engine Parts",
    image: "/timing-belt.png",
    rating: 4.9,
    reviews: 178,
    inStock: true,
  },
  {
    id: 7,
    name: "Brake Disc Rotor",
    price: 65000,
    category: "Brake System",
    image: "/brake-disc.png",
    rating: 4.6,
    reviews: 92,
    inStock: true,
  },
  {
    id: 8,
    name: "Headlight Assembly",
    price: 150000,
    category: "Body Parts",
    image: "/placeholder-rxucr.png",
    rating: 4.3,
    reviews: 45,
    inStock: true,
  },
  {
    id: 9,
    name: "Alternator 12V",
    price: 180000,
    category: "Electrical",
    image: "/car-alternator.png",
    rating: 4.7,
    reviews: 134,
    inStock: true,
  },
  {
    id: 10,
    name: "Fuel Filter",
    price: 25000,
    category: "Filters",
    image: "/fuel-filter.png",
    rating: 4.5,
    reviews: 78,
    inStock: true,
  },
  {
    id: 11,
    name: "Piston Ring Set",
    price: 75000,
    category: "Engine Parts",
    image: "/piston-rings.png",
    rating: 4.8,
    reviews: 112,
    inStock: true,
  },
  {
    id: 12,
    name: "Coil Spring Rear",
    price: 55000,
    category: "Suspension",
    image: "/metal-coil-spring.png",
    rating: 4.4,
    reviews: 89,
    inStock: true,
  },
]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("latest")

  const category = categoryMap[params.slug]

  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return allProducts.filter((product) => product.category === category.name)
  }, [category.name])

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...categoryProducts]
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "rating":
        return products.sort((a, b) => b.rating - a.rating)
      default:
        return products
    }
  }, [categoryProducts, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Back Button */}
        <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{categoryProducts.length} products available</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">TSh {product.price.toLocaleString()}</span>
                      {product.inStock ? (
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-red-700 bg-red-100">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link href={`/products/${product.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="icon" disabled={!product.inStock}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">We don't have any products in this category yet.</p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
