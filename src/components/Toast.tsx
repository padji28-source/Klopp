import { ShoppingCart, X } from 'lucide-react';
import { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  name: string;
  img: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart: () => void;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
  onOpenCart: () => void;
  key?: string;
}

export function ToastContainer({ toasts, onDismiss, onOpenCart }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onDismiss={onDismiss} 
          onOpenCart={onOpenCart} 
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss, onOpenCart }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="bg-white border-2 border-orange-100 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-[0_10px_30px_rgba(249,115,22,0.12)] animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3">
        <img 
          src={toast.img} 
          alt={toast.name} 
          className="w-11 h-11 rounded-xl object-cover shrink-0 border-2 border-orange-100"
        />
        <div className="text-left">
          <p className="text-slate-900 text-xs font-black leading-tight line-clamp-1">{toast.name}</p>
          <p className="text-orange-600 text-[10px] font-bold mt-0.5 flex items-center gap-1">
            <ShoppingCart className="w-3 h-3 text-orange-500" /> Ditambahkan ke Keranjang!
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => {
            onOpenCart();
            onDismiss(toast.id);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          Lihat
        </button>
        <button 
          onClick={() => onDismiss(toast.id)} 
          className="text-slate-400 hover:text-orange-500 p-1 rounded-full hover:bg-orange-50 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
