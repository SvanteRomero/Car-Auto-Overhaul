import Link from "next/link"
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold text-white">AutoParts TZ</span>
            </div>
            <p className="text-sm">
              Your trusted source for genuine auto parts in Tanzania. We provide quality parts with fast delivery and
              competitive prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-accent transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/engine" className="text-sm hover:text-accent transition-colors">
                  Engine Parts
                </Link>
              </li>
              <li>
                <Link href="/categories/brakes" className="text-sm hover:text-accent transition-colors">
                  Brake System
                </Link>
              </li>
              <li>
                <Link href="/categories/suspension" className="text-sm hover:text-accent transition-colors">
                  Suspension
                </Link>
              </li>
              <li>
                <Link href="/categories/electrical" className="text-sm hover:text-accent transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link href="/categories/filters" className="text-sm hover:text-accent transition-colors">
                  Filters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">+255 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">info@autopartstz.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm">© {new Date().getFullYear()} AutoParts TZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
