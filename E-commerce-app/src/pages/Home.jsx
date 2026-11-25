
import { useState } from "react";

import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import useProducts from "../hooks/useProducts";
import useProductFilters from "../hooks/useProductFilters";

import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";

import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart, cartCount } = useCart();

  const { products, loading, error } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Mobile filter panel state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Product filtering and sorting
  const sortedProducts = useProductFilters(
    products,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    sortOption
  );

  // Get unique product categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Close mobile filters after selecting a category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowMobileFilters(false);
  };

  // Sidebar properties
  const sidebarProps = {
    categories,
    selectedCategory,
    onCategoryChange: handleCategoryChange,
    minPrice,
    maxPrice,
    onPriceRangeChange: (min, max) => {
      setMinPrice(min);
      setMaxPrice(max);
    },
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">

        {/* Page Heading */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shop Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover our products
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-600 py-8">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-red-500 py-8">
            {error}
          </p>
        ) : (
          <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-5">

              <button
                type="button"
                onClick={() =>
                  setShowMobileFilters(!showMobileFilters)
                }
                aria-expanded={showMobileFilters}
                className="w-full flex items-center justify-center gap-2
                border border-gray-300 rounded-lg px-4 py-3
                bg-white text-gray-800 font-medium
                hover:bg-gray-50 transition"
              >
                <SlidersHorizontal
                  size={18}
                  className="text-blue-600"
                />

                <span>
                  {showMobileFilters
                    ? "Hide Filters"
                    : "Filter Products"}
                </span>

                {showMobileFilters ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {/* Mobile Sidebar */}
              {showMobileFilters && (
                <div className="mt-4">
                  <Sidebar {...sidebarProps} />
                </div>
              )}

            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <Sidebar {...sidebarProps} />
              </aside>

              {/* Product Section */}
              <div className="flex-1 min-w-0">

                {/* Product Count and Sorting */}
                <div className="flex flex-col sm:flex-row
                justify-between sm:items-center gap-3 mb-5">

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Showing
                    </span>

                    <span className="text-sm font-semibold
                    text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                      {sortedProducts.length} products
                    </span>
                  </div>

                  {/* Sorting */}
                  <select
                    value={sortOption}
                    onChange={(e) =>
                      setSortOption(e.target.value)
                    }
                    className="w-full sm:w-auto border border-gray-300
                    rounded-lg px-3 py-2.5 text-sm bg-white
                    outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">
                      Default sorting
                    </option>

                    <option value="low-to-high">
                      Price: Low to High
                    </option>

                    <option value="high-to-low">
                      Price: High to Low
                    </option>

                    <option value="rating">
                      Highest Rated
                    </option>

                    <option value="name">
                      Name: A to Z
                    </option>
                  </select>

                </div>

                {/* Product List */}
                <ProductList
                  products={sortedProducts}
                  onAddToCart={addToCart}
                />

              </div>
            </div>
          </>
        )}

      </main>
    </>
  );
}

export default Home;
