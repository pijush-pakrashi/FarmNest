// Pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Truck,
  Clock,
  CreditCard,
  Wallet,
  Banknote,
  MapPin,
  Package,
  ArrowLeft,
  Zap,
  Trash2,
} from 'lucide-react';

/* ── Payment method label & icon ── */
const PaymentBadge = ({ method }) => {
  const map = {
    card:  { label: 'Card',   icon: CreditCard, color: 'bg-blue-50 text-blue-700'   },
    upi:   { label: 'UPI',    icon: Wallet,      color: 'bg-purple-50 text-purple-700' },
    cod:   { label: 'COD',    icon: Banknote,    color: 'bg-amber-50 text-amber-700'  },
  };
  const m = map[method] || map.card;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${m.color}`}>
      <Icon size={11} /> {m.label}
    </span>
  );
};

/* ── Single order card ── */
const OrderCard = ({ order, index, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.date);
  const formattedDate = date.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* ── Header row ── */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* order ID */}
            <p className="text-xs text-gray-400 font-mono mb-0.5">{order.orderId}</p>
            {/* amount & method */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-extrabold text-green-700">
                ₹{order.total?.toLocaleString('en-IN')}
              </span>
              <PaymentBadge method={order.paymentMethod} />
            </div>
            {/* date + instant tag */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} /> {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <Zap size={10} /> Instant Delivery
              </span>
            </div>
          </div>

          {/* status pill + chevron + delete */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
              <CheckCircle size={12} /> Delivered
            </span>
            <div className="flex items-center gap-2">
              {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(order.orderId); }}
                title="Delete order"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </button>

      {/* ── Expandable items ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">

              {/* items list */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package size={12} /> Items Ordered
              </p>
              {order.cartItems?.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    {item.image
                      ? <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                      : <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-lg">🥬</div>
                    }
                    <div>
                      <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}  ×  ₹{item.price}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              {/* total row */}
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-gray-700">Total Paid</span>
                <span className="text-sm font-extrabold text-green-700">
                  ₹{order.total?.toLocaleString('en-IN')}
                </span>
              </div>

              {/* delivery address */}
              {order.formData && (
                <div className="mt-3 bg-green-50 rounded-xl px-4 py-3 flex items-start gap-3">
                  <MapPin size={15} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">Delivered to</p>
                    <p className="text-xs text-gray-500">
                      {order.formData.name}
                      {order.formData.address ? `, ${order.formData.address}` : ''}
                      {order.formData.city    ? `, ${order.formData.city}`    : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* delivery steps mini timeline */}
              <div className="mt-3 flex items-center gap-2">
                {['Confirmed', 'Packed', 'On the way', 'Delivered'].map((s, i, arr) => (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle size={11} className="text-white" />
                      </div>
                      <p className="text-[9px] text-gray-400 text-center leading-tight w-12">{s}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-0.5 bg-green-200 mb-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Orders Page
───────────────────────────────────────────── */
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      try { setOrders(JSON.parse(stored)); } catch { setOrders([]); }
    }
  }, []);

  const handleDelete = (orderId) => {
    const updated = orders.filter(o => o.orderId !== orderId);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-lg mx-auto">

        {/* ── Back link ── */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
            <ShoppingBag size={22} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-green-800 leading-tight">My Orders</h1>
            <p className="text-xs text-gray-400">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
          </div>
        </div>

        {/* ── Order cards ── */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={36} className="text-green-400" />
            </div>
            <p className="text-lg font-bold text-gray-600 mb-2">No orders yet</p>
            <p className="text-sm text-gray-400 mb-6">Your completed orders will appear here.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all"
            >
              <ShoppingBag size={16} />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* instant delivery notice */}
            <div className="flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm">
              <Truck size={14} />
              All orders delivered within 30–60 minutes
              <Zap size={12} className="ml-auto" />
            </div>

            {orders.map((order, i) => (
              <OrderCard key={order.orderId || i} order={order} index={i} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
