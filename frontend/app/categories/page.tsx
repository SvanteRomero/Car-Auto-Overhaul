import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FuelIcon as Engine, Disc, Zap, Filter, Car, Settings } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Engine Parts",
    icon: Engine,
    count: 245,
    href: "/categories/engine",
    description: "Pistons, gaskets, belts, and engine components",
  },
  {
    name: "Brake System",
    icon: Disc,
    count: 189,
    href: "/categories/brakes",
    description: "Brake pads, rotors, calipers, and brake fluid",
  },
  {
    name: "Suspension",
    icon: Settings,
    count: 156,
    href: "/categories/suspension",
    description: "Shocks, struts, springs, and suspension components",
  },
  {
    name: "Electrical",
    icon: Zap,
    count: 203,
    href: "/categories/electrical",
    description: "Batteries, alternators, starters, and wiring",
  },
  {
    name: "Filters",
    icon: Filter,
    count: 134,
    href: "/categories/filters",
    description: "Air filters, oil filters, fuel filters, and cabin filters",
  },
  {
    name: "Body Parts",
    icon: Car,
    count: 298,
    href: "/categories/body",
    description: "Bumpers, mirrors, lights, and exterior components",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect auto parts for your vehicle. Browse our comprehensive selection of high-quality parts
            organized by category.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <Badge variant="secondary" className="ml-2">
                            {category.count} items
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Popular Brands Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Toyota",
              "Honda",
              "Nissan",
              "Mazda",
              "Mitsubishi",
              "Subaru",
              "BMW",
              "Mercedes",
              "Audi",
              "Volkswagen",
              "Ford",
              "Chevrolet",
            ].map((brand) => (
              <Link
                key={brand}
                href={`/makes/${brand.toLowerCase()}`}
                className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-700 hover:text-blue-600">{brand}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-blue-100 mb-6">Our expert team can help you find the right parts for your vehicle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse All Products
              </Link>
              <Link
                href="/contact"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
