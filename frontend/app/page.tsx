import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Cog, Zap, Wrench, Car, Shield, Truck, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Toyota Hilux Brake Pads",
      price: "TSh 85,000",
      image: "/brake-pads-auto-parts.png",
      category: "Brake System",
    },
    {
      id: 2,
      name: "Honda Civic Oil Filter",
      price: "TSh 25,000",
      image: "/placeholder-8tzu6.png",
      category: "Filters",
    },
    {
      id: 3,
      name: "Nissan Navara Shock Absorber",
      price: "TSh 120,000",
      image: "/placeholder-f49qa.png",
      category: "Suspension",
    },
    {
      id: 4,
      name: "Universal LED Headlight",
      price: "TSh 65,000",
      image: "/placeholder-p9doo.png",
      category: "Electrical",
    },
    {
      id: 5,
      name: "Toyota Corolla Air Filter",
      price: "TSh 18,000",
      image: "/placeholder-yoxer.png",
      category: "Filters",
    },
    {
      id: 6,
      name: "Mitsubishi L200 Clutch Kit",
      price: "TSh 180,000",
      image: "/placeholder-ii9vn.png",
      category: "Engine Parts",
    },
  ]

  const categories = [
    {
      name: "Engine Parts",
      icon: Cog,
      count: 245,
      href: "/categories/engine",
    },
    {
      name: "Brake System",
      icon: Zap,
      count: 156,
      href: "/categories/brakes",
    },
    {
      name: "Suspension",
      icon: Wrench,
      count: 89,
      href: "/categories/suspension",
    },
    {
      name: "Electrical",
      icon: Car,
      count: 134,
      href: "/categories/electrical",
    },
    {
      name: "Filters",
      icon: Shield,
      count: 78,
      href: "/categories/filters",
    },
    {
      name: "Body Parts",
      icon: Truck,
      count: 92,
      href: "/categories/body",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Genuine Parts",
      description: "All our parts are sourced directly from manufacturers and authorized dealers.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery in Dar es Salaam and nationwide shipping within 2-3 days.",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "12-month warranty on all parts with hassle-free returns and exchanges.",
    },
    {
      icon: Clock,
      title: "Expert Support",
      description: "Our experienced team helps you find the right parts for your vehicle.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white py-24 lg:py-32"
        style={{
          backgroundImage: "url('/placeholder-noxwx.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Premium Auto Parts in Tanzania</h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your trusted source for genuine auto parts. Fast delivery, competitive prices, and expert support.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3">
            Shop All Parts
          </Button>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Find the Right Part for Your Vehicle</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by part name or number..." className="h-12 text-lg" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Select car make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                  <SelectItem value="mazda">Mazda</SelectItem>
                  <SelectItem value="subaru">Subaru</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Popular auto parts trusted by mechanics across Tanzania</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Browse our extensive collection of auto parts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.name} href={category.href}>
                  <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} products</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AutoParts TZ?</h2>
            <p className="text-muted-foreground text-lg">
              We're committed to providing the best auto parts experience in Tanzania
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-accent/10">
                      <IconComponent className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
