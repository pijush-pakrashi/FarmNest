// Pages/success.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Home,
  Clock,
  ShoppingBag,
  ClipboardList,
  Zap,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { findNearestStore, getDeliveryLabel } from '../data/farmnestStores';

// Fix default Leaflet marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const warehouseIcon = L.divIcon({
  className: '',
  html: `<div style="background:#16a34a;color:#fff;font-weight:900;font-size:11px;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.25)">
           <span style="transform:rotate(45deg)">🏪</span></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const homeIcon = L.divIcon({
  className: '',
  html: `<div style="background:#dc2626;color:#fff;font-size:11px;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.25)">
           <span style="transform:rotate(45deg)">🏠</span></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const bikeIcon = L.divIcon({
  className: '',
  html: `<div style="font-size:24px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">🛵</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Sub-component: fit map to route bounds
const FitBounds = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 1) {
      map.fitBounds(coords, { padding: [40, 40] });
    }
  }, [coords, map]);
  return null;
};

// Sub-component: animated bike marker that smoothly interpolates along route
const AnimatedBike = ({ routeCoords }) => {
  const markerRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 55000; // 55 s to travel full route

  useEffect(() => {
    if (!routeCoords || routeCoords.length < 2) return;
    const totalSegments = routeCoords.length - 1;

    // Reset animation start time on each new route
    startRef.current = null;

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      // Smooth linear interpolation between consecutive waypoints
      const exactIdx = progress * totalSegments;
      const segIdx = Math.min(Math.floor(exactIdx), totalSegments - 1);
      const segFrac = exactIdx - segIdx;
      const p1 = routeCoords[segIdx];
      const p2 = routeCoords[Math.min(segIdx + 1, totalSegments)];

      const lat = p1[0] + (p2[0] - p1[0]) * segFrac;
      const lng = p1[1] + (p2[1] - p1[1]) * segFrac;

      if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [routeCoords]);

  if (!routeCoords || routeCoords.length === 0) return null;
  return <Marker ref={markerRef} position={routeCoords[0]} icon={bikeIcon} />;
};


/* ─────────────────────────────────────────────
   Real Live Map using OpenStreetMap + OSRM
   Uses delivery address from checkout (NOT browser GPS)
───────────────────────────────────────────── */
const LiveMap = ({ isActive, deliveryCity, deliveryState }) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    routeCoords: null,
    warehouse: null,
    destination: null,
    eta: null,
    distKm: null,
    destName: null,
  });

  useEffect(() => {
    if (!isActive) return;

    const fetchRoute = async (userLat, userLng, name) => {
      // Find nearest store to user
      const store = findNearestStore(userLat, userLng);

      // Same-city detection: if user is within 3 km straight-line of store,
      // OSRM would return 0 or near-0. Use a synthetic intra-city route instead.
      const { haversineKm } = await import('../data/farmnestStores');
      const straightKm = haversineKm(store.lat, store.lng, userLat, userLng);
      const IS_SAME_CITY = straightKm < 3;

      if (IS_SAME_CITY) {
        // Synthesize route: store → midpoint (slightly offset) → user destination
        // Offset by 0.02 deg (~2.2km) to create a visible route on the map
        const midLat = (store.lat + userLat) / 2 + 0.018;
        const midLng = (store.lng + userLng) / 2 + 0.012;
        const roadKm = Math.max(2.0, straightKm * 1.4 + 1.8); // realistic intra-city road km
        const etaMins = Math.round(roadKm * 3.5);               // ~3.5 min/km in city
        setState({
          loading: false, error: null,
          routeCoords: [
            [store.lat, store.lng],
            [midLat, midLng],
            [userLat, userLng],
          ],
          warehouse: [store.lat, store.lng],
          warehouseName: `Farmnest ${store.city} Store`,
          destination: [userLat, userLng],
          eta: etaMins,
          distKm: parseFloat(roadKm.toFixed(1)),
          destName: name || 'Your Location',
        });
        return;
      }

      // Different city → real OSRM road route
      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/${store.lng},${store.lat};${userLng},${userLat}` +
          `?overview=full&geometries=geojson&steps=false`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.code !== 'Ok') throw new Error('OSRM error');

        const coords = data.routes[0].geometry.coordinates.map(([lo, la]) => [la, lo]);
        const secs = Math.round(data.routes[0].duration);
        const meters = Math.round(data.routes[0].distance);
        const km = Math.max(1.0, meters / 1000).toFixed(1);  // always at least 1 km
        const etaMins = Math.max(1, Math.round(secs / 60));

        setState({
          loading: false, error: null,
          routeCoords: coords,
          warehouse: [store.lat, store.lng],
          warehouseName: `Farmnest ${store.city} Store`,
          destination: [userLat, userLng],
          eta: etaMins,
          distKm: parseFloat(km),
          destName: name || 'Your Location',
        });
      } catch {
        setState(s => ({ ...s, loading: false, error: 'Route unavailable. Check connection.' }));
      }
    };

    // Geocode delivery address from checkout form (city + state)
    // This ensures the map always shows Akash's Bangalore, not GPS location
    const geocodeDeliveryAddress = async () => {
      const city = deliveryCity || 'Bangalore';
      const state = deliveryState || 'Karnataka';
      const query = `${city}, ${state}, India`;
      try {
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&accept-language=en`,
          { headers: { Accept: 'application/json' } }
        );
        const d = await r.json();
        if (d && d[0]) {
          fetchRoute(parseFloat(d[0].lat), parseFloat(d[0].lon), city);
        } else {
          // If geocode fails, use Bangalore coordinates as safe fallback
          fetchRoute(12.9716, 77.5946, city);
        }
      } catch {
        fetchRoute(12.9716, 77.5946, city);
      }
    };

    geocodeDeliveryAddress();
  }, [isActive, deliveryCity, deliveryState]);

  if (!isActive) return null;

  if (state.loading) {
    return (
      <div style={{ height: 260, background: '#f0fdf4', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent" />
        <p style={{ fontSize: 13, color: '#15803d', fontWeight: 600 }}>Finding nearest Farmnest store…</p>
      </div>
    );
  }

  if (!state.routeCoords) {
    return (
      <div style={{ height: 220, background: '#fef2f2', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 12, color: '#dc2626', padding: '0 16px', textAlign: 'center' }}>{state.error}</p>
      </div>
    );
  }

  const label = getDeliveryLabel(state.distKm);

  return (
    <div>
      {/* ── Info strip: nearest store → user ── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <div style={{ flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 14px' }}>
          <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Route</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>
            🏪 {state.warehouseName || 'Farmnest Store'}
          </p>
          <p style={{ fontSize: 11, color: '#9ca3af', margin: '2px 0' }}>↓ {state.distKm} km by road</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#dc2626' }}>🏠 {state.destName}</p>
        </div>
        <div style={{ background: label.bg, border: `1px solid ${label.color}33`, borderRadius: 12, padding: '10px 14px', minWidth: 120, textAlign: 'center' }}>
          <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Delivery Time</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: label.color, lineHeight: 1.2 }}>{label.time}</p>
          <span style={{ display: 'inline-block', marginTop: 4, fontSize: 11, background: label.color, color: '#fff', borderRadius: 999, padding: '2px 8px', fontWeight: 700 }}>{label.tag}</span>
        </div>
      </div>

      {/* ── Map ── */}
      <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', position: 'relative', height: 240, zIndex: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
        <MapContainer
          center={state.destination}
          zoom={state.distKm > 200 ? 7 : state.distKm > 50 ? 10 : 13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds coords={state.routeCoords} />

          {/* Road route — green */}
          <Polyline
            positions={state.routeCoords}
            pathOptions={{ color: '#16a34a', weight: 4, opacity: 0.9 }}
          />

          {/* Warehouse pin — nearest store */}
          <Marker position={state.warehouse} icon={warehouseIcon}>
            <Popup><b>🏪 {state.warehouseName}</b><br />Nearest Farmnest Store</Popup>
          </Marker>

          {/* Destination pin */}
          <Marker position={state.destination} icon={homeIcon}>
            <Popup><b>🏠 {state.destName}</b><br />{state.distKm} km from {state.warehouseName}</Popup>
          </Marker>

          {/* Animated scooter */}
          <AnimatedBike routeCoords={state.routeCoords} />
        </MapContainer>

        {/* Bottom badge */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          zIndex: 999, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
          padding: '5px 16px', borderRadius: 999, boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
          display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          fontSize: 12, fontWeight: 700, color: '#15803d',
        }}>
          <Clock size={12} />
          {state.distKm} km &nbsp;·&nbsp; Est. {label.time}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Delivery partner data (static / mock)
───────────────────────────────────────────── */
const PARTNER = {
  name: 'Ramesh Singh',
  vehicle: 'DL 5S AB 1234',
  rating: 4.8,
  reviews: 312,
  // inline SVG avatar – no external image needed
};

/* ─────────────────────────────────────────────
   Order status steps
───────────────────────────────────────────── */
const STEPS = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, delay: 0 },
  { id: 'packed', label: 'Order Packed', icon: Package, delay: 4000 },
  { id: 'on_way', label: 'On the way', icon: Truck, delay: 9000 },
  { id: 'delivered', label: 'Delivered', icon: MapPin, delay: 18000 },
];

/* ─────────────────────────────────────────────
   Inline avatar SVG (no external dependency)
───────────────────────────────────────────── */
const AvatarSVG = () => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="40" fill="#d1fae5" />
    {/* body */}
    <ellipse cx="40" cy="62" rx="22" ry="18" fill="#6ee7b7" />
    {/* head */}
    <circle cx="40" cy="30" r="16" fill="#fcd9b6" />
    {/* hair */}
    <ellipse cx="40" cy="17" rx="16" ry="8" fill="#1f2937" />
    {/* helmet stripe */}
    <rect x="24" y="19" width="32" height="5" rx="2" fill="#16a34a" />
    {/* eyes */}
    <circle cx="34" cy="30" r="2" fill="#1f2937" />
    <circle cx="46" cy="30" r="2" fill="#1f2937" />
    {/* smile */}
    <path d="M35 37 Q40 42 45 37" stroke="#1f2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   Bike SVG (rendered on the map)
───────────────────────────────────────────── */
const BikeSVG = ({ className }) => (
  <svg
    viewBox="0 0 64 40"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* wheels */}
    <circle cx="12" cy="28" r="10" fill="none" stroke="#1f2937" strokeWidth="3" />
    <circle cx="52" cy="28" r="10" fill="none" stroke="#1f2937" strokeWidth="3" />
    <circle cx="12" cy="28" r="3" fill="#1f2937" />
    <circle cx="52" cy="28" r="3" fill="#1f2937" />
    {/* frame */}
    <line x1="12" y1="28" x2="32" y2="14" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="14" x2="52" y2="28" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="14" x2="32" y2="28" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="28" x2="12" y2="28" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    {/* handlebar */}
    <line x1="32" y1="14" x2="38" y2="10" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <line x1="36" y1="8" x2="40" y2="12" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
    {/* seat */}
    <line x1="24" y1="14" x2="32" y2="14" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    {/* rider helmet */}
    <circle cx="38" cy="6" r="5" fill="#16a34a" />
    <circle cx="38" cy="6" r="3" fill="#6ee7b7" />
    {/* delivery box */}
    <rect x="8" y="14" width="14" height="10" rx="2" fill="#16a34a" />
    <line x1="15" y1="14" x2="15" y2="24" stroke="#fff" strokeWidth="1" />
    <line x1="8" y1="19" x2="22" y2="19" stroke="#fff" strokeWidth="1" />
  </svg>
);



/* ─────────────────────────────────────────────
   Star rating row
───────────────────────────────────────────── */
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={13}
        className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}
      />
    ))}
    <span className="ml-1 text-xs text-gray-500 font-medium">{rating} ({PARTNER.reviews})</span>
  </div>
);

/* ─────────────────────────────────────────────
   Delivery partner card
───────────────────────────────────────────── */
const PartnerCard = () => (
  <motion.div
    key="partner-card"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
    className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
  >
    {/* avatar */}
    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-300 flex-shrink-0 shadow-sm">
      <AvatarSVG />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-gray-800 text-base leading-tight">{PARTNER.name}</p>
      <StarRating rating={PARTNER.rating} />
      <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
        <Truck size={11} className="text-green-600" />
        <span className="font-mono font-semibold text-gray-700">{PARTNER.vehicle}</span>
      </p>
    </div>
    {/* action buttons */}
    <div className="flex flex-col gap-2 flex-shrink-0">
      <button
        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        onClick={() => alert('Calling Ramesh Singh...')}
      >
        <Phone size={12} /> Call
      </button>
      <button
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        onClick={() => alert('Opening chat...')}
      >
        <MessageSquare size={12} /> Chat
      </button>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Main Success / Tracking Page
───────────────────────────────────────────── */
const Success = () => {
  const { state } = useLocation();
  const { orderId, formData, total, cartItems } = state || {};

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showItems, setShowItems] = useState(false);
  const timerRefs = useRef([]);

  // Progress through steps automatically
  useEffect(() => {
    STEPS.forEach((step, idx) => {
      if (idx === 0) return; // first step is immediate
      const t = setTimeout(() => {
        setCurrentStepIndex(idx);
      }, step.delay);
      timerRefs.current.push(t);
    });
    return () => timerRefs.current.forEach(clearTimeout);
  }, []);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found.</p>
          <Link to="/" className="text-green-600 underline">Go to Home</Link>
        </div>
      </div>
    );
  }

  const currentStep = STEPS[currentStepIndex];
  const isOnTheWay = currentStep.id === 'on_way';
  const isDelivered = currentStep.id === 'delivered';
  const showMap = isOnTheWay || isDelivered;
  const showPartner = isOnTheWay || isDelivered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">

      {/* ── Confetti-like circles ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#6ee7b7', '#34d399', '#a7f3d0', '#fbbf24', '#fb923c'][i % 5],
            }}
            animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="max-w-lg mx-auto space-y-5">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2 pb-1"
        >
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isDelivered
              ? <CheckCircle size={44} className="text-green-600" />
              : <ShoppingBag size={42} className="text-green-500" />}
          </motion.div>
          <h1 className="text-3xl font-extrabold text-green-800 mb-1">
            {isDelivered ? 'Delivered! 🎉' : 'Order Placed! 🛒'}
          </h1>
          <p className="text-gray-500 text-sm">Order ID: <span className="font-mono font-semibold text-gray-700">{orderId}</span></p>
        </motion.div>

        {/* ── Status timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md px-5 py-4"
        >
          <div className="relative">
            {/* vertical connector */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-100" />

            <div className="space-y-5">
              {STEPS.map((step, idx) => {
                const done = idx <= currentStepIndex;
                const current = idx === currentStepIndex;
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center gap-4 relative">
                    {/* circle */}
                    <motion.div
                      animate={current ? { scale: [1, 1.12, 1] } : {}}
                      transition={{ duration: 1.2, repeat: current ? Infinity : 0 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${done
                          ? 'bg-green-500 shadow-md shadow-green-200'
                          : 'bg-gray-100'
                        }`}
                    >
                      <Icon size={18} className={done ? 'text-white' : 'text-gray-400'} />
                    </motion.div>

                    <div className="flex-1">
                      <p className={`font-semibold text-sm transition-colors duration-500 ${done ? 'text-green-700' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {current && !isDelivered && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-gray-400 mt-0.5"
                        >
                          {step.id === 'confirmed' && 'Your order has been confirmed ✓'}
                          {step.id === 'packed' && 'Items are being packed...'}
                          {step.id === 'on_way' && 'Ramesh is heading your way!'}
                        </motion.p>
                      )}
                    </div>

                    {done && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle size={16} className="text-green-400" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Live Map ── */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              key="map-block"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-2xl shadow-md overflow-hidden"
            >
              <div className="bg-white px-4 pt-4 pb-2 flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <MapPin size={15} className="text-green-600" />
                  Live Tracking
                </p>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="px-4 pb-4">
                <LiveMap
                  isActive={isOnTheWay}
                  deliveryCity={formData?.city}
                  deliveryState={formData?.state}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Delivery partner card ── */}
        <AnimatePresence>
          {showPartner && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                Your Delivery Partner
              </p>
              <PartnerCard />
            </div>
          )}
        </AnimatePresence>

        {/* ── Order summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <button
            onClick={() => setShowItems(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-700 flex items-center gap-2">
              <Package size={16} className="text-green-600" />
              Order Summary ({cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''})
            </span>
            {showItems ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>

          <AnimatePresence>
            {showItems && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 space-y-2 border-t border-gray-50">
                  {cartItems?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <span className="text-sm font-bold text-gray-800">Total Paid</span>
                    <span className="text-sm font-extrabold text-green-700">
                      ₹{total?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Delivery address ── */}
        {formData && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-start gap-3"
          >
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Home size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Delivering to</p>
              <p className="text-sm font-semibold text-gray-800">{formData.name}</p>
              <p className="text-xs text-gray-500">{formData.address}{formData.city ? `, ${formData.city}` : ''}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formData.email}</p>
            </div>
          </motion.div>
        )}

        {/* ── Instant delivery badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex items-center justify-center gap-2 bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm"
        >
          <Zap size={13} />
          Your order will be delivered within 30–60 minutes
          <Truck size={13} />
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 pb-8"
        >
          <Link
            to="/orders"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <ClipboardList size={18} />
            View My Orders
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-green-700 border-2 border-green-200 font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Success;
