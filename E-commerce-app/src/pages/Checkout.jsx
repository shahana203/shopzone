
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Customer form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Calculate order total
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  // Update form fields
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Place order
  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const order = {
      customer: formData,
      items: cart,
      paymentMethod,
      subtotal,
      shipping,
      total,
      orderDate: new Date().toLocaleString(),
    };

    navigate("/order-success", {
      state: { order },
    });
  }

  // Empty cart check
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

        <ShoppingBag size={60} className="text-gray-300 mb-4" />

        <h1 className="text-2xl font-bold text-gray-800">
          Your cart is empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

          <Link to="/" className="text-2xl font-bold text-gray-900">
            Shop<span className="text-blue-600">Zone</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={20} className="text-green-600" />
            Secure Checkout
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Checkout
        </h1>

        <p className="text-gray-500 mb-8">
          Complete your delivery and payment details.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Customer Details */}
            <div className="lg:col-span-2 space-y-6">

              <section className="bg-white rounded-xl shadow-sm border p-6">

                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <MapPin className="text-blue-600" />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    Delivery Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit phone number"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House name, street, area"
                      rows="3"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PIN Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      pattern="[0-9]{6}"
                      title="Enter a valid 6-digit PIN code"
                      required
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-xl shadow-sm border p-6">

                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <CreditCard className="text-blue-600" />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* Cash on Delivery */}
                  <label className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                    }`}>

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-blue-600"
                    />

                    <Truck size={25} className="text-gray-600" />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                  </label>

                  {/* Online Payment */}
                  <label className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "online"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                    }`}>

                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-blue-600"
                    />

                    <CreditCard size={25} className="text-gray-600" />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Online Payment
                      </h3>

                      <p className="text-sm text-gray-500">

                      </p>
                    </div>

                  </label>

                </div>

                {paymentMethod === "online" && (
                  <div className="mt-4 bg-blue-50 text-blue-700 text-sm p-4 rounded-lg">

                  </div>
                )}

              </section>

            </div>

            {/* Order Summary */}
            <aside className="bg-white rounded-xl shadow-sm border p-6 h-fit">

              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-2"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              <div className="border-t mt-6 pt-5 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

              <button
                type="submit" onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {paymentMethod === "cod"
                  ? "Place Order"
                  : "Pay Now (Demo)"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">

              </p>

            </aside>

          </div>

        </form>

      </main>
    </div>
  );
}

export default Checkout;
