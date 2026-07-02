import { Link, useLocation, Navigate } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" />;

  const handleDownloadInvoice = () => {
    const invoice = `
=========================================
            ShopEZ - INVOICE
=========================================
Order ID: ${order._id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Payment: ${order.paymentMethod}
Status: ${order.isPaid ? 'Paid' : 'Pending'}
-----------------------------------------
${order.items.map((i) => `${i.name} x${i.quantity}  ₹${(i.price * i.quantity).toFixed(2)}`).join('\n')}
-----------------------------------------
Subtotal: ₹${order.subtotal?.toFixed(2) || ''}
Discount: ₹${order.discount?.toFixed(2) || '0.00'}
Total:    ₹${order.totalPrice.toFixed(2)}
=========================================
Shipping to: ${order.shippingAddress?.address || ''}
             ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}
             ${order.shippingAddress?.country || ''}
=========================================
Estimated Delivery: ${order.estimatedDelivery || '5-7 business days'}
=========================================
Thank you for shopping with ShopEZ!
    `;
    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order._id.slice(-8).toUpperCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
      <div className="max-w-[550px] mx-auto text-center bg-white dark:bg-slate-800 p-8 md:p-12 rounded-lg shadow-sm">
        <div className="w-16 h-16 rounded-full bg-green-500 text-white text-[32px] inline-flex items-center justify-center mb-4 mx-auto">
          &#10003;
        </div>
        <h1 className="text-2xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 mb-6 text-left space-y-2 text-sm">
          <p><strong>Order ID:</strong> <span className="font-mono">{order._id}</span></p>
          <p><strong>Total:</strong> <span className="font-bold">₹{order.totalPrice.toFixed(2)}</span></p>
          <p><strong>Payment:</strong> {order.paymentMethod} {order.isPaid ? '(Paid)' : '(Pending)'}</p>
          {order.estimatedDelivery && (
            <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>
          )}
          {order.discount > 0 && <p><strong>Discount Applied:</strong> -₹{order.discount.toFixed(2)}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 no-underline active:scale-[0.98]">
            View My Orders
          </Link>
          <button onClick={handleDownloadInvoice}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer active:scale-[0.98]">
            Download Invoice
          </button>
        </div>
        <Link to="/products" className="inline-block mt-4 text-sm text-indigo-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
