// Components/OfflineScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw, ShoppingBag, Truck, Zap, Leaf, Signal } from 'lucide-react';

/* ── Animated farm delivery illustration (SVG, no external img) ── */
const FarmDeliveryIllustration = () => (
  <svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg" className="w-64 h-40">
    {/* sky */}
    <rect x="0" y="0" width="260" height="160" rx="16" fill="#f0fdf4" />

    {/* clouds */}
    <ellipse cx="40" cy="30" rx="22" ry="12" fill="#dcfce7" />
    <ellipse cx="58" cy="24" rx="16" ry="10" fill="#dcfce7" />
    <ellipse cx="200" cy="26" rx="18" ry="10" fill="#dcfce7" />
    <ellipse cx="218" cy="20" rx="14" ry="9" fill="#dcfce7" />

    {/* road */}
    <rect x="0" y="120" width="260" height="40" rx="0" fill="#d1fae5" />
    <rect x="0" y="120" width="260" height="6" fill="#6ee7b7" />
    {/* road dashes */}
    {[20, 60, 100, 140, 180, 220].map((x, i) => (
      <rect key={i} x={x} y="138" width="28" height="5" rx="2" fill="#a7f3d0" />
    ))}

    {/* delivery box on bike */}
    <rect x="28" y="80" width="42" height="34" rx="6" fill="#16a34a" />
    <rect x="30" y="82" width="38" height="30" rx="4" fill="#15803d" />
    {/* box cross lines */}
    <line x1="49" y1="82" x2="49" y2="112" stroke="#bbf7d0" strokeWidth="1.5" />
    <line x1="30" y1="97" x2="68" y2="97" stroke="#bbf7d0" strokeWidth="1.5" />
    {/* Farmnest label on box */}
    <text x="49" y="95" textAnchor="middle" fill="#dcfce7" fontSize="5" fontWeight="bold">🌿</text>

    {/* bike frame */}
    <line x1="70" y1="120" x2="100" y2="88" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <line x1="100" y1="88" x2="148" y2="120" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <line x1="100" y1="88" x2="100" y2="120" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <line x1="70" y1="120" x2="100" y2="120" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />

    {/* handlebar */}
    <line x1="100" y1="88" x2="120" y2="78" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <line x1="116" y1="74" x2="124" y2="82" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />

    {/* wheel back */}
    <circle cx="70" cy="120" r="18" fill="none" stroke="#1f2937" strokeWidth="5" />
    <circle cx="70" cy="120" r="6" fill="#1f2937" />
    {/* wheel front */}
    <circle cx="148" cy="120" r="18" fill="none" stroke="#1f2937" strokeWidth="5" />
    <circle cx="148" cy="120" r="6" fill="#1f2937" />

    {/* rider body */}
    <circle cx="114" cy="68" r="12" fill="#16a34a" />
    <circle cx="114" cy="68" r="7" fill="#6ee7b7" />
    {/* helmet visor */}
    <path d="M108 64 Q114 60 120 64" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* wifi-off icon top-right */}
    <circle cx="220" cy="48" r="22" fill="#fef2f2" />
    <line x1="210" y1="38" x2="230" y2="58" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    <path d="M208 46 Q220 38 232 46" stroke="#fca5a5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M212 50 Q220 44 228 50" stroke="#f87171" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="220" cy="56" r="2.5" fill="#ef4444" />
  </svg>
);

/* ── Tip pill shown in offline screen ── */
const Tip = ({ icon, text }) => (
  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
    <span>{icon}</span> {text}
  </span>
);

/* ── Main offline screen ── */
const OfflineScreen = ({ onRetry }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 50%,#d1fae5 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', fontFamily: 'Inter,system-ui,sans-serif', position: 'relative', overflow: 'hidden' }}
    >
      {/* floating blobs */}
      {[
        { w: 120, h: 120, l: '5%',  t: '8%',  bg: '#6ee7b7', dur: 4.2 },
        { w: 90,  h: 90,  l: '80%', t: '12%', bg: '#34d399', dur: 5.1 },
        { w: 70,  h: 70,  l: '20%', t: '70%', bg: '#a7f3d0', dur: 3.8 },
        { w: 100, h: 100, l: '75%', t: '65%', bg: '#fbbf24', dur: 4.6 },
        { w: 60,  h: 60,  l: '50%', t: '85%', bg: '#86efac', dur: 5.4 },
      ].map((b, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', borderRadius: '50%', opacity: 0.18, width: b.w, height: b.h, left: b.l, top: b.t, background: b.bg, zIndex: 0 }}
          animate={{ y: [0, -14, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 380, width: '100%' }}>

        {/* logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={22} color="#fff" />
          </div>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#14532d', letterSpacing: '-0.5px' }}>Farmnest</span>
        </motion.div>

        {/* illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 8 }}
        >
          <motion.div
            animate={{ x: [-5, 5, -5], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            <FarmDeliveryIllustration />
          </motion.div>
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: 26, fontWeight: 900, color: '#1f2937', marginBottom: 8, marginTop: 4 }}
        >
          You're Offline
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: '#6b7280', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}
        >
          Our delivery partner is ready, but we can't reach you{dots}<br />
          Please check your internet connection and try again.
        </motion.p>

        {/* tip pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 28 }}
        >
          <Tip icon="⚡" text="30–60 min delivery" />
          <Tip icon="🥦" text="Fresh vegetables & fruits" />
          <Tip icon="🚚" text="Free above ₹500" />
          <Tip icon="🔒" text="Secure checkout" />
        </motion.div>

        {/* retry button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={onRetry}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#16a34a', color: '#fff', fontWeight: 700,
            fontSize: 15, padding: '14px 36px', borderRadius: 16,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(22,163,74,0.35)',
          }}
        >
          <RefreshCw size={18} />
          Try Again
        </motion.button>

        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 20 }}>
          Your cart &amp; orders are saved — nothing will be lost.
        </p>
      </div>
    </div>
  );
};

/* ── Detector wrapper — wraps the entire app ── */
export const OfflineDetector = ({ children }) => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const goOnline  = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online',  goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online',  goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (!isOnline) return <OfflineScreen onRetry={handleRetry} />;
  return children;
};

export default OfflineDetector;
