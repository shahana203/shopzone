
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-5">🛒</div>

        <h1 className="text-3xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3">
          Add some products to your cart!
        </p>

        <Link
          to="/"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">
              {cart.length} different products in your cart
            </p>
          </div>

          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Products */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {item.title}
                  </h2>

                  <p className="text-blue-600 font-bold text-lg mt-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm font-medium mt-4 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="font-bold text-gray-800 sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">

            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">
                Free
              </span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >Proceed To Check Out
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Shipping is free on all orders.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
