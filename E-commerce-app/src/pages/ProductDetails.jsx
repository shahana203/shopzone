import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

function handleAddToCart() {
  addToCart(product);
  navigate("/cart");
}


  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await getProducts();
        const selectedProduct = products.find(
          (item) => item.id === Number(id)
        );
        setProduct(selectedProduct);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p className="p-8">Loading product...</p>;

  if (!product) return <p className="p-8">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="text-blue-600">
        ← Continue Shopping
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <div className="bg-white p-8 rounded-xl flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="text-2xl font-bold mt-3">{product.title}</h1>
          <p className="text-yellow-500 mt-3">
            ★★★★★ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className="text-3xl font-bold mt-5">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-5">{product.description}</p>

  <button
             onClick={handleAddToCart}
            className="mt-7 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>  

      
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;