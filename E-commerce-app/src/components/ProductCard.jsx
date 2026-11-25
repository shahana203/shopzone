import { Link, useNavigate  } from "react-router-dom";
import { Star } from "lucide-react";
function ProductCard({
  productId,
  name,
  description,
  price,
  image,
  rating,
  reviews,
    onAddToCart
}){
const navigate = useNavigate();

function handleAddToCart() {
  onAddToCart();
  navigate("/cart");
} 

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
 <Link to={`/product/${productId}`}>
      {/* Product Image */}
      <div className="relative bg-gray-100 h-56 flex items-center justify-center overflow-hidden">
{/* 
        <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </span> */}

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
        />

      </div>

       <div className="p-4 pb-0">

        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-10">
          {name}
        </h2>
</div>
 </Link>
 <div className="px-4 pb-4 flex flex-col">
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 min-h-8">
          {description}
        </p>

        {/* Rating */}
       
<div className="flex items-center gap-2 mt-3">

  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={
          star <= Math.round(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ))}
  </div>

  <span className="text-xs text-gray-500">
    {rating} ({reviews} reviews)
  </span>

</div>


        {/* Price */}
        <h3 className="text-xl font-bold text-gray-900 mt-3">
          ${price}
        </h3>

        {/* Add to Cart */}
        <button
          // onClick={onAddToCart}
 onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all duration-300"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
