
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Menu, ShoppingCart, Heart, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, logout, getCartItemsCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItemsCount = getCartItemsCount();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-campus-purple">Campus<span className="text-campus-orange">Bite</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-campus-purple transition-colors">
            Home
          </Link>
          <Link to="/canteens" className="text-gray-700 hover:text-campus-purple transition-colors">
            Canteens
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-campus-purple transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-campus-purple transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/wishlist" className="relative text-gray-700 hover:text-campus-purple transition-colors">
            <Heart size={24} />
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-campus-purple transition-colors">
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-campus-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="border-campus-purple text-campus-purple">
                  <User size={18} className="mr-1" /> Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => logout()}
                className="text-gray-700 hover:text-campus-purple"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="bg-campus-purple hover:bg-campus-purple-dark">
                Login
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-campus-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/canteens" 
              className="text-gray-700 hover:text-campus-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Canteens
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-campus-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-campus-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <Link 
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-campus-purple transition-colors"
              >
                <Heart size={20} />
              </Link>
              <Link 
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="relative text-gray-700 hover:text-campus-purple transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-campus-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="flex gap-4">
                  <Link 
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="text-xs border-campus-purple text-campus-purple">
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-campus-purple"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="default" size="sm" className="bg-campus-purple hover:bg-campus-purple-dark text-xs">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
