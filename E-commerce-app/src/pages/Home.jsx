
import { useState } from "react";

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

  const sortedProducts = useProductFilters(
    products,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    sortOption
  );

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shop Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover our products
          </p>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            <div className="w-full lg:w-64 shrink-0">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceRangeChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </div>

            <div className="flex-1 min-w-0">

              <div className="flex justify-between items-center mb-5">
<div className="flex items-center gap-2">
  <span className="text-sm text-gray-500">
    Showing
  </span>

  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
    {sortedProducts.length} products
  </span>
</div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Default sorting</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>

              </div>

              <ProductList
                products={sortedProducts}
                onAddToCart={addToCart}
              />

            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
