import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#171717] text-white px-4 py-3 rounded-xs shadow-xl flex items-center gap-3 border border-[#333] max-w-sm">
        {toast.type === 'success' && (
          <CheckCircle2 className="w-4 h-4 text-[#D8B984] shrink-0" />
        )}
        {toast.type === 'info' && (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        {toast.type === 'error' && (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        )}
        <p className="text-xs font-medium tracking-wide leading-snug">
          {toast.message}
        </p>
      </div>
    </div>
  );
};
