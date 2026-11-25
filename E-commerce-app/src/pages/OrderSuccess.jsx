
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("shopzone-last-order");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-8 text-center">

        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle size={65} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with ShopZone.
          Your demo order has been confirmed.
        </p>

        {order ? (
          <div className="mt-8 text-left border rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Order Summary</h2>
              <Package className="text-blue-600" />
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Order ID: {order.orderId}
            </p>

            {order.customer && (
              <div className="mb-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-800">
                  Delivery Details
                </p>
                <p>{order.customer.name}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.address}</p>
              </div>
            )}

            <div className="border-t pt-4 space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="text-gray-600">
                    {item.title} × {item.quantity}
                  </span>

                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total Paid / Due</span>
              <span className="text-blue-600">
                ${Number(order.total).toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Payment method: {order.paymentMethod}
            </p>

          </div>
        ) : (
          <p className="text-gray-500 mt-6">
            Your order confirmation details are not available.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <ShoppingBag size={19} />
            Continue Shopping
          </Link>

          <Link
            to="/cart"
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Cart
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
