import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import assets from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        setOrderData(response.data.orders); // ✅ MISSING LINE
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={" ORDERS"} />
      </div>
      <div>
        {orderData.map((order, index) =>
          order.items.map((item, i) => (
            <div
              key={`${index}-${i}`}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2">
                    Date:
                    <span className="text-gray-400">
                      {new Date(order.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    PaymentMethod:
                    <span className="text-gray-400 ml-1">
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 bg-green-500 rounded-full h-2"></p>
                  <p className="md:text-base text-sm">{order.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Orders;
