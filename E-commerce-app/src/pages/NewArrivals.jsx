
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Sparkles } from "lucide-react";

function NewArrivals() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Display the latest 8 products for this demo
  const newProducts = [...products].slice(-8).reverse();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles size={24} />
            <span className="uppercase tracking-widest text-sm font-semibold">
              Fresh Finds
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            New Arrivals
          </h1>

          <p className="mt-4 text-blue-100">
            Discover products from our latest collection.
          </p>

          <Link
            to="/"
            className="inline-block mt-7 bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Explore All Products
          </Link>

        </div>
      </section>

      {/* New Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recently Added Products
          </h2>

          <p className="text-gray-500 mt-2">
            Explore our selected collection.
          </p>
        </div>

        {loading ? (
          <p className="text-center py-10">
            Loading new arrivals...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : newProducts.length === 0 ? (
          <p className="text-gray-500">
            No new products available.
          </p>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {newProducts.map((product) => (
              <div key={product.id} className="relative">

                <span className="absolute top-3 left-3 z-20 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>

                <ProductCard
                  productId={product.id}
                  name={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  rating={product.rating.rate}
                  reviews={product.rating.count}
                  onAddToCart={() => addToCart(product)}
                />

              </div>
            ))}

          </div>

        )}

      </section>
    </div>
  );
}

export default NewArrivals;
