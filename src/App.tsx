import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero, Divider, VibeSection, Footer } from './components/Sections';
import { MenuSection } from './components/MenuSection';
import { CartModal, CheckoutModal, CustomAlert } from './components/Modals';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PromoNotification } from './components/PromoNotification';
import { CashierView } from './components/CashierView';
import { PaymentModal } from './components/PaymentModal';
import { menuData } from './data';
import { CartItem, MenuItem, Order } from './types';
import { LayoutGrid, ClipboardList } from 'lucide-react';

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'mock-1',
    customerName: 'Adji Prasetyo',
    tableNumber: '3',
    items: [
      { id: 'c1', name: 'Kopi Susu Klopp', desc: 'Signature kopi susu gula aren', price: 25000, img: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?q=80&w=400&h=400&fit=crop', category: 'coffee', qty: 2 },
      { id: 'n3', name: 'Mix Platter', desc: 'Snack ringan pendamping', price: 20000, img: 'https://images.unsplash.com/photo-1625938146369-adc83368b421?q=80&w=400&h=400&fit=crop', category: 'non-coffee', qty: 1 }
    ],
    notes: 'Kopi Susu gula arennya sedikit aja ya mas, Platter ekstra saos sambal.',
    totalAmount: 70000,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-2',
    customerName: 'Siti Rahma',
    tableNumber: '8',
    items: [
      { id: 'n1', name: 'Matcha Latte', desc: 'Matcha premium dengan susu', price: 30000, img: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?q=80&w=400&h=400&fit=crop', category: 'non-coffee', qty: 1 },
      { id: 'c3', name: 'Cafe Latte', desc: 'Perfectly textured milk', price: 28000, img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&h=400&fit=crop', category: 'coffee', qty: 1 }
    ],
    notes: 'Matcha Latte dingin, Cafe Latte hangat.',
    totalAmount: 58000,
    status: 'preparing',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-3',
    customerName: 'Budi Hartono',
    tableNumber: '11',
    items: [
      { id: 'c2', name: 'Americano', desc: 'Hot / Iced, bold and smooth', price: 22000, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400&h=400&fit=crop', category: 'coffee', qty: 1 }
    ],
    notes: 'Americano dingin strong.',
    totalAmount: 22000,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString()
  }
];

export default function App() {
  const [menus, setMenus] = useState<MenuItem[]>(menuData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState<{name: string, table: string} | null>(null);
  const [currentOrderAmount, setCurrentOrderAmount] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCashierMode, setIsCashierMode] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize data on mount
  useEffect(() => {
    // 1. Get Table Number parameter from URL (?table=X)
    const params = new URLSearchParams(window.location.search);
    const tableId = params.get('table');
    if (tableId) {
      setTableNumber(tableId);
    }

    // 2. Load orders from localStorage or set initial mocks
    const savedOrders = localStorage.getItem('klopp_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        setOrders(INITIAL_MOCK_ORDERS);
      }
    } else {
      setOrders(INITIAL_MOCK_ORDERS);
    }
  }, []);

  // Save orders to localStorage on change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('klopp_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });

    // Spawn a beautiful success toast feedback
    const toastId = Math.random().toString();
    setToasts((prev) => [...prev, { id: toastId, name: item.name, img: item.img }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const newCart = prev.map((i) => {
        if (i.id === id) {
          return { ...i, qty: i.qty + delta };
        }
        return i;
      });
      return newCart.filter((i) => i.qty > 0);
    });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleCheckoutSubmit = (name: string, table: string) => {
    setIsCheckoutOpen(false);

    const notesEl = (document.getElementById('cust-notes') as HTMLTextAreaElement)?.value || '';
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrderId = 'ord-' + Date.now();

    const newOrder: Order = {
      id: newOrderId,
      customerName: name,
      tableNumber: table,
      items: [...cart],
      notes: notesEl || undefined,
      totalAmount: totalAmount,
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCurrentOrderAmount(totalAmount);
    setPendingCheckout({name, table});
    
    setTimeout(() => setIsPaymentOpen(true), 300);
  };

  const handlePaymentSuccess = (method: string) => {
    setIsPaymentOpen(false);
    if (!pendingCheckout) return;

    if (method !== 'Bayar di Kasir') {
      // Find latest order and mark as paid
      setOrders(prev => {
        const newOrders = [...prev];
        newOrders[0].paymentStatus = 'paid';
        return newOrders;
      });
    }

    const valMsg = method === 'Bayar di Kasir' 
      ? `Terima kasih <b>${pendingCheckout.name}</b>! Silakan selesaikan pembayaran di kasir.<br><br>Pesanan kamu untuk <b>Meja ${pendingCheckout.table}</b> telah masuk ke sistem kami.`
      : `Pembayaran via ${method} berhasil! 🎉<br><br>Terima kasih <b>${pendingCheckout.name}</b>! Pesananmu untuk <b>Meja ${pendingCheckout.table}</b> sedang kami siapkan.`;

    setPendingCheckout(null);

    setTimeout(() => {
      setAlertMessage(valMsg);
    }, 300);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    if (!pendingCheckout) return;

    const msg = `Pesanan masuk! Terima kasih <b>${pendingCheckout.name}</b>.<br><br>Silakan selesaikan pembayaran di kasir untuk <b>Meja ${pendingCheckout.table}</b>.`;
    setPendingCheckout(null);

    setTimeout(() => {
      setAlertMessage(msg);
    }, 300);
  };

  // Cashier State Updates
  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleUpdateOrderPayment = (id: string, paymentStatus: Order['paymentStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, paymentStatus } : o)));
  };

  const handleClearOrders = () => {
    setOrders([]);
    localStorage.removeItem('klopp_orders');
  };

  const handleToggleSoldOut = (id: string) => {
    setMenus(prev => prev.map(m => m.id === id ? { ...m, isSoldOut: !m.isSoldOut } : m));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="antialiased overflow-x-hidden text-slate-800 min-h-screen flex flex-col relative pb-16 md:pb-0">
      {/* Fixed Background Image for Hero Section */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <img 
          src="/klopp1.jpg" 
          alt="Suasana Cafe Klopp.tb" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Header cartItemCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          {isCashierMode ? (
            <CashierView 
              orders={orders}
              menus={menus}
              onUpdateStatus={handleUpdateOrderStatus}
              onUpdatePayment={handleUpdateOrderPayment}
              onClearAll={handleClearOrders}
              onToggleSoldOut={handleToggleSoldOut}
            />
          ) : (
            <>
              <Hero />
              <Divider />
              <VibeSection />
              <MenuSection menus={menus} onAdd={handleAddToCart} />
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* PERSISTENT FLOATING VIEW MODE TOGGLE (Fokus Utama Mobile & UX) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-full px-4">
        <div className="bg-white/95 p-1.5 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.15)] border-2 border-orange-200/50 flex gap-1 justify-between backdrop-blur-xl">
          <button
            onClick={() => setIsCashierMode(false)}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !isCashierMode
                ? 'bg-orange-500 text-white shadow-md font-black'
                : 'text-slate-500 hover:text-slate-800 hover:bg-orange-50/50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Mode Pelanggan
          </button>
          
          <button
            onClick={() => setIsCashierMode(true)}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isCashierMode
                ? 'bg-orange-500 text-white shadow-md font-black'
                : 'text-slate-500 hover:text-slate-800 hover:bg-orange-50/50'
            }`}
          >
            <ClipboardList className="w-4 h-4" /> Kasir Online
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <span className="bg-red-500 text-white text-[9px] font-black h-4 px-1.5 min-w-4 rounded-full flex items-center justify-center animate-bounce">
                {orders.filter(o => o.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onProceed={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBack={handleBackToCart}
        onSubmit={handleCheckoutSubmit}
        defaultTable={tableNumber}
        orders={orders}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={handlePaymentClose}
        totalAmount={currentOrderAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {alertMessage && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setAlertMessage(null)} 
        />
      )}

      {/* Promo Popup Notification */}
      <PromoNotification />

      {/* Cart Toasts SUCCESS alerts */}
      <ToastContainer 
        toasts={toasts} 
        onDismiss={handleDismissToast} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
    </div>
  );
}
