import { X, QrCode, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { formatRp } from '../data';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentSuccess: (method: string) => void;
}

export function PaymentModal({ isOpen, onClose, totalAmount, onPaymentSuccess }: PaymentModalProps) {
  const [method, setMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(method);
    }, 2000); // Simulate processing time
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden">
        {isProcessing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-slate-800">Memproses Pembayaran...</h3>
            <p className="text-slate-500 mt-2">Mohon selesaikan pembayaran di aplikasi pilihanmu.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Pembayaran</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 rounded-full p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-2xl text-center mb-6 border border-orange-100">
              <p className="text-slate-500 text-sm font-semibold mb-1">Total Tagihan</p>
              <p className="text-3xl font-black text-orange-600">Rp {formatRp(totalAmount)}</p>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-slate-700 font-bold mb-2">Pilih Metode Pembayaran</p>
              
              <button 
                onClick={() => setMethod('QRIS')}
                className={`w-full flex items-center justify-between p-4 border-2 rounded-2xl transition-all ${method === 'QRIS' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">QRIS</p>
                    <p className="text-xs text-slate-500">GoPay, OVO, Dana, LinkAja</p>
                  </div>
                </div>
                {method === 'QRIS' ? <CheckCircle2 className="text-orange-500 w-5 h-5" /> : <ChevronRight className="text-slate-300 w-5 h-5" />}
              </button>

              <button 
                onClick={() => setMethod('Transfer Bank')}
                className={`w-full flex items-center justify-between p-4 border-2 rounded-2xl transition-all ${method === 'Transfer Bank' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">Transfer Bank</p>
                    <p className="text-xs text-slate-500">BCA, Mandiri, BRI, BNI</p>
                  </div>
                </div>
                {method === 'Transfer Bank' ? <CheckCircle2 className="text-orange-500 w-5 h-5" /> : <ChevronRight className="text-slate-300 w-5 h-5" />}
              </button>
            </div>

            <button 
              onClick={handlePay}
              disabled={!method}
              className={`w-full py-4 rounded-xl font-black transition-all mb-3 ${method ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:-translate-y-1' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              Bayar Sekarang
            </button>

            <button 
              onClick={() => onPaymentSuccess('Bayar di Kasir')}
              className="w-full py-4 rounded-xl font-bold bg-white text-slate-600 hover:bg-slate-50 transition-all border border-slate-200"
            >
              Bayar Nanti di Kasir
            </button>
          </>
        )}
      </div>
    </div>
  );
}
