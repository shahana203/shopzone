
import { Link } from "react-router-dom";
import useProducts  from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Offers() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Select a few products for demo offers
  const offerProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Offers Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <p className="uppercase tracking-widest text-blue-100 font-semibold">
            Special Deals at ShopZone
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Amazing Offers!
          </h1>

          <p className="mt-4 text-blue-100">
            Discover exciting demo discounts on selected products.
          </p>

          <Link
            to="/"
            className="inline-block mt-7 bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Shop Now
          </Link>

        </div>
      </section>

      {/* Offer Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Today's Special Offers
          </h2>

          <p className="text-gray-500 mt-2">
            Explore our selected products.
          </p>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading offers...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : offerProducts.length === 0 ? (
          <p>No offers available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {offerProducts.map((product) => (
              <div key={product.id} className="relative">

                <span className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SPECIAL OFFER
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

export default Offers;
