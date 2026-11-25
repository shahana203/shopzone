
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  House,
  Tag,
  Sparkles,
  Phone,
} from "lucide-react";

function Navbar({ searchTerm, onSearchChange, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearch() {
    onSearchChange(searchTerm.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <ShoppingBag size={24} />
            </div>

            <span className="text-2xl font-bold text-gray-900">
              Shop<span className="text-blue-600">Zone</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">

            <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
              <House size={17} />
              Home
            </Link>

            <a href="#shop" className="hover:text-blue-600">
              Shop
            </a>

         <Link
  to="/offers"
  className="hover:text-blue-600 flex items-center gap-1"
>
  <Tag size={16} />
  Offers
</Link>
<Link
  to="/new-arrivals"
  className="hover:text-blue-600 flex items-center gap-1"
>
  <Sparkles size={16} />
  New Arrivals
</Link>

            <Link
  to="/contact"
  className="hover:text-blue-600 flex items-center gap-1"
>
  <Phone size={16} />
  Contact
</Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex flex-1 max-w-sm items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
          >

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />

            <button
              type="submit"
              aria-label="Search products"
              className="text-gray-500 hover:text-blue-600"
            >
              <Search size={21} />
            </button>

          </form>

          {/* User and Cart */}
          <div className="flex items-center gap-4">

            <button
              type="button"
              aria-label="User account"
              className="hidden sm:block text-gray-600 hover:text-blue-600"
            >
              <UserRound size={23} />
            </button>

            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative text-gray-700 hover:text-blue-600"
            >
              <ShoppingBag size={25} />

              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>

          </div>

        </div>

        {/* Mobile Search */}
        <form
          onSubmit={handleSubmit}
          className="flex sm:hidden items-center border border-gray-300 rounded-full px-4 py-2 mt-4"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />

          <button type="submit" aria-label="Search products">
            <Search size={21} className="text-gray-500" />
          </button>
        </form>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col gap-4 mt-5 border-t pt-4 text-sm font-medium text-gray-700">

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>

            <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </a>

          <Link
  to="/offers"
  onClick={() => setMobileMenuOpen(false)}
  className="hover:text-blue-600"
>
  Offers
</Link>

         <Link
  to="/new-arrivals"
  onClick={() => setMobileMenuOpen(false)}
>
  New Arrivals
</Link>

           <Link
  to="/contact"
  onClick={() => setMobileMenuOpen(false)}
>
  Contact
</Link>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
