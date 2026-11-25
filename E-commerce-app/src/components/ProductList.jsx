
import ProductCard from "./ProductCard";
import { PackageSearch } from "lucide-react";

function ProductList({ products, onAddToCart }) {

  // Show a message when no products are available
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">

        <div className="bg-blue-50 p-6 rounded-full mb-5">
          <PackageSearch
            size={55}
            strokeWidth={1.5}
            className="text-blue-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-2 max-w-sm">
          We couldn't find any products matching your search.
          Try a different keyword or adjust your filters.
        </p>

      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          name={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          rating={product.rating.rate}
          reviews={product.rating.count}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}

    </div>
  );
}

export default ProductList;
