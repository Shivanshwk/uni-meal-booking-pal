
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-campus-purple">
              Campus<span className="text-campus-orange">Bite</span>
            </h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Making campus dining easier and more enjoyable for university students.
              Book your meals from multiple canteens with ease.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-campus-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/canteens" className="text-gray-600 hover:text-campus-purple transition-colors">
                  Canteens
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-campus-purple transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-campus-purple transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-campus-purple transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-campus-purple transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-campus-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-campus-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact Us</h4>
            <p className="text-sm text-gray-600">
              University Campus <br />
              Building 123, Room 456 <br />
              Email: support@campusbite.com <br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CampusBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
