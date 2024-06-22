/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paidAt: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className=" border-b border-gray-700 py-4">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="border-t border-gray-700 py-4">
            {order.orderItems.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center mb-4">
                <img
                  src={item.product.images[0] }
                  alt={item.product.name}
                  className="w-28 h-28 mr-4 object-contain"
                />
                <div>
                  <p className="font-bold">{item.product.name || 'Unknown Product'}</p>
                  <p>{new Date(order.paidAt).toLocaleDateString() || 'Unknown Date'}</p>
                  <p>Price: ${item.product.price || 'Unknown Price'}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
            ))}
            <div>
              <p className="font-bold">Total: ${order.totalPrice}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
