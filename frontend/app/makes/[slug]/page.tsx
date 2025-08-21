"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ShoppingCart, Star, Car } from "lucide-react"

// Car makes mapping
const makeMap: Record<string, { name: string; description: string; logo: string; founded: string; country: string }> = {
  toyota: {
    name: "Toyota",
    description: "World's largest automaker known for reliability",
    logo: "🚗",
    founded: "1937",
    country: "Japan",
  },
  honda: {
    name: "Honda",
    description: "Innovative engineering and fuel efficiency",
    logo: "🚙",
    founded: "1948",
    country: "Japan",
  },
  nissan: { name: "Nissan", description: "Innovation that excites", logo: "🚐", founded: "1933", country: "Japan" },
  mazda: { name: "Mazda", description: "Zoom-Zoom driving pleasure", logo: "🚕", founded: "1920", country: "Japan" },
  mitsubishi: { name: "Mitsubishi", description: "Drive your ambition", logo: "🚗", founded: "1970", country: "Japan" },
  subaru: { name: "Subaru", description: "Confidence in motion", logo: "🚙", founded: "1953", country: "Japan" },
  isuzu: { name: "Isuzu", description: "Commercial vehicle specialist", logo: "🚚", founded: "1916", country: "Japan" },
  suzuki: { name: "Suzuki", description: "Way of life", logo: "🚗", founded: "1909", country: "Japan" },
  bmw: { name: "BMW", description: "The ultimate driving machine", logo: "🏎️", founded: "1916", country: "Germany" },
  mercedes: {
    name: "Mercedes-Benz",
    description: "The best or nothing",
    logo: "🚘",
    founded: "1926",
    country: "Germany",
  },
  audi: { name: "Audi", description: "Vorsprung durch Technik", logo: "🚗", founded: "1909", country: "Germany" },
  volkswagen: { name: "Volkswagen", description: "Das Auto", logo: "🚙", founded: "1937", country: "Germany" },
}

// Mock products data with car make compatibility
const allProducts = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    price: 45000,
    category: "Brake System",
    compatibleMakes: ["Toyota", "Honda", "Nissan"],
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
    compatibleMakes: ["Toyota", "Mazda", "Subaru"],
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
    compatibleMakes: ["BMW", "Mercedes", "Audi"],
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
    compatibleMakes: ["Toyota", "Honda", "Nissan", "Mazda"],
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
    compatibleMakes: ["Honda", "Suzuki", "Mitsubishi"],
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
    compatibleMakes: ["Toyota", "Honda"],
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
    compatibleMakes: ["BMW", "Mercedes", "Audi", "Volkswagen"],
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
    compatibleMakes: ["Nissan", "Mazda"],
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
    compatibleMakes: ["Isuzu", "Mitsubishi", "Suzuki"],
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
    compatibleMakes: ["Toyota", "Honda", "Nissan", "Mazda", "Subaru"],
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
    compatibleMakes: ["Toyota", "Honda"],
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
    compatibleMakes: ["Subaru", "Mazda"],
    image: "/metal-coil-spring.png",
    rating: 4.4,
    reviews: 89,
    inStock: true,
  },
]

interface MakePageProps {
  params: {
    slug: string
  }
}

export default function MakePage({ params }: MakePageProps) {
  const [sortBy, setSortBy] = useState("latest")

  const make = makeMap[params.slug]

  if (!make) {
    notFound()
  }

  // Filter products by car make
  const makeProducts = useMemo(() => {
    return allProducts.filter((product) => product.compatibleMakes.includes(make.name))
  }, [make.name])

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...makeProducts]
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
  }, [makeProducts, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/makes" className="hover:text-blue-600">
            Car Makes
          </Link>
          <span>/</span>
          <span className="text-gray-900">{make.name}</span>
        </nav>

        {/* Back Button */}
        <Link href="/makes" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Car Makes
        </Link>

        {/* Make Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">{make.logo}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{make.name}</h1>
              <p className="text-gray-600 mt-2">{make.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Founded: {make.founded}</span>
                <span>•</span>
                <span>Origin: {make.country}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{makeProducts.length} compatible products available</p>
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
                    <div className="text-xs text-gray-500">Compatible with: {product.compatibleMakes.join(", ")}</div>
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
            <div className="text-6xl mb-4">
              <Car className="h-16 w-16 mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No compatible products found</h3>
            <p className="text-gray-600 mb-6">We don't have any products compatible with {make.name} yet.</p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
