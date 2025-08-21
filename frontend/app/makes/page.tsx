import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, ChevronRight } from "lucide-react"

// Car makes data with product counts
const carMakes = [
  { slug: "toyota", name: "Toyota", logo: "🚗", productCount: 245, description: "Reliable parts for Toyota vehicles" },
  { slug: "honda", name: "Honda", logo: "🚙", productCount: 189, description: "Quality Honda replacement parts" },
  { slug: "nissan", name: "Nissan", logo: "🚐", productCount: 156, description: "Genuine Nissan auto parts" },
  { slug: "mazda", name: "Mazda", logo: "🚕", productCount: 134, description: "Premium Mazda components" },
  { slug: "mitsubishi", name: "Mitsubishi", logo: "🚗", productCount: 112, description: "Durable Mitsubishi parts" },
  { slug: "subaru", name: "Subaru", logo: "🚙", productCount: 98, description: "Performance Subaru parts" },
  { slug: "isuzu", name: "Isuzu", logo: "🚚", productCount: 87, description: "Heavy-duty Isuzu components" },
  { slug: "suzuki", name: "Suzuki", logo: "🚗", productCount: 76, description: "Compact Suzuki auto parts" },
  { slug: "bmw", name: "BMW", logo: "🏎️", productCount: 65, description: "Luxury BMW replacement parts" },
  { slug: "mercedes", name: "Mercedes-Benz", logo: "🚘", productCount: 54, description: "Premium Mercedes parts" },
  { slug: "audi", name: "Audi", logo: "🚗", productCount: 43, description: "High-quality Audi components" },
  { slug: "volkswagen", name: "Volkswagen", logo: "🚙", productCount: 38, description: "Reliable VW auto parts" },
]

// Popular makes (top 6)
const popularMakes = carMakes.slice(0, 6)

export default function MakesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Car Makes</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Shop by Car Make</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect auto parts for your specific vehicle make. We stock genuine and compatible parts for all
            major brands.
          </p>
        </div>

        {/* Popular Makes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Makes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMakes.map((make) => (
              <Card key={make.slug} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Link href={`/makes/${make.slug}`} className="block">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{make.logo}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {make.name}
                          </h3>
                          <p className="text-sm text-gray-600">{make.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {make.productCount} parts available
                      </Badge>
                      <span className="text-sm text-blue-600 font-medium group-hover:underline">View Parts →</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Makes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Car Makes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {carMakes.map((make) => (
              <Card key={make.slug} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link href={`/makes/${make.slug}`} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{make.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {make.name}
                          </h3>
                          <p className="text-sm text-gray-500">{make.productCount} parts</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Car Make?</h2>
          <p className="text-xl mb-6 opacity-90">
            We're constantly expanding our inventory. Contact us for specific vehicle parts.
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary">
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Browse All Products
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
