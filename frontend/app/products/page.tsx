"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const allProducts = [
    {
      id: 1,
      name: "Toyota Hilux Brake Pads",
      price: 85000,
      image: "/brake-pads-auto-parts.png",
      category: "Brake System",
      make: "Toyota",
      inStock: true,
    },
    {
      id: 2,
      name: "Honda Civic Oil Filter",
      price: 25000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Filters",
      make: "Honda",
      inStock: true,
    },
    {
      id: 3,
      name: "Nissan Navara Shock Absorber",
      price: 120000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Suspension",
      make: "Nissan",
      inStock: true,
    },
    {
      id: 4,
      name: "Universal LED Headlight",
      price: 65000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electrical",
      make: "Universal",
      inStock: false,
    },
    {
      id: 5,
      name: "Toyota Corolla Air Filter",
      price: 18000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Filters",
      make: "Toyota",
      inStock: true,
    },
    {
      id: 6,
      name: "Mitsubishi L200 Clutch Kit",
      price: 180000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Engine Parts",
      make: "Mitsubishi",
      inStock: true,
    },
    {
      id: 7,
      name: "Honda CR-V Radiator",
      price: 95000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Cooling System",
      make: "Honda",
      inStock: true,
    },
    {
      id: 8,
      name: "Nissan X-Trail Brake Disc",
      price: 75000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Brake System",
      make: "Nissan",
      inStock: true,
    },
    {
      id: 9,
      name: "Toyota Prado Fuel Filter",
      price: 32000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Filters",
      make: "Toyota",
      inStock: true,
    },
    {
      id: 10,
      name: "Subaru Forester Alternator",
      price: 145000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electrical",
      make: "Subaru",
      inStock: false,
    },
    {
      id: 11,
      name: "Mazda CX-5 Timing Belt",
      price: 55000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Engine Parts",
      make: "Mazda",
      inStock: true,
    },
    {
      id: 12,
      name: "Isuzu D-Max Leaf Spring",
      price: 110000,
      image: "/placeholder.svg?height=200&width=200",
      category: "Suspension",
      make: "Isuzu",
      inStock: true,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  const categoryMapping: { [key: string]: string } = {
    engine: "Engine Parts",
    brakes: "Brake System",
    suspension: "Suspension",
    electrical: "Electrical",
    filters: "Filters",
    body: "Body Parts",
  }

  const categories = [
    "Engine Parts",
    "Brake System",
    "Suspension",
    "Electrical",
    "Filters",
    "Body Parts",
    "Transmission",
    "Cooling System",
  ]

  const carMakes = ["Toyota", "Nissan", "Honda", "Mitsubishi", "Mazda", "Subaru", "Isuzu", "Ford"]

  useEffect(() => {
    if (!hasInitialized) {
      const categoryParam = searchParams.get("category")
      const makeParam = searchParams.get("make")

      if (categoryParam && categoryMapping[categoryParam]) {
        setSelectedCategories([categoryMapping[categoryParam]])
      }

      if (makeParam) {
        // Capitalize first letter to match the carMakes format
        const formattedMake = makeParam.charAt(0).toUpperCase() + makeParam.slice(1).toLowerCase()
        if (carMakes.includes(formattedMake)) {
          setSelectedMakes([formattedMake])
        }
      }

      setHasInitialized(true)
    }
  }, [hasInitialized]) // Only depend on hasInitialized flag instead of searchParams

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleMakeChange = (make: string, checked: boolean) => {
    if (checked) {
      setSelectedMakes([...selectedMakes, make])
    } else {
      setSelectedMakes(selectedMakes.filter((m) => m !== make))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedMakes([])
    setPriceRange([0, 500000])
  }

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesMake = selectedMakes.length === 0 || selectedMakes.includes(product.make)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesMake && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "latest":
      default:
        return b.id - a.id
    }
  })

  const productsPerPage = 9
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Search Products</h3>
        <Input placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="h-auto p-0 text-xs">
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Car Make</h3>
          {selectedMakes.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedMakes([])} className="h-auto p-0 text-xs">
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {carMakes.map((make) => (
            <div key={make} className="flex items-center space-x-2">
              <Checkbox
                id={make}
                checked={selectedMakes.includes(make)}
                onCheckedChange={(checked) => handleMakeChange(make, checked as boolean)}
              />
              <Label htmlFor={make} className="text-sm">
                {make}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Price Range</h3>
          <Button variant="ghost" size="sm" onClick={() => setPriceRange([0, 500000])} className="h-auto p-0 text-xs">
            Reset
          </Button>
        </div>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>TSh {priceRange[0].toLocaleString()}</span>
            <span>TSh {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Auto Parts</h1>
        <p className="text-muted-foreground">Browse our extensive collection of genuine auto parts</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Card className="p-6">
            <FilterSidebar />
          </Card>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="mb-4 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(selectedCategories.length + selectedMakes.length > 0 || searchTerm) && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length + selectedMakes.length + (searchTerm ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p className="text-muted-foreground">
              Showing {displayedProducts.length} of {filteredProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedProducts.map((product) => (
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
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{product.make}</p>
                    <p className="text-2xl font-bold text-primary">TSh {product.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" disabled={!product.inStock}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
