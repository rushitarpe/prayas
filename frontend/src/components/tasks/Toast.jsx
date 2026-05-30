import React, { useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-550 border-green-500 text-white shadow-green-950/20';
      case 'error':
        return 'bg-red-550 border-red-500 text-white shadow-red-950/20';
      case 'info':
        return 'bg-blue-550 border-blue-500 text-white shadow-blue-950/20';
      default:
        return 'bg-gray-800 border-gray-700 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-[9999] flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl transition-all duration-350 transform animate-in fade-in slide-in-from-top-4 ${getToastStyles()}`}>
      <div className="flex items-center gap-2">
        {getIcon()}
        <p className="font-semibold text-sm max-w-xs">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-white/70 hover:text-white transition-colors p-0.5 rounded-md hover:bg-white/10"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      <style>{`
        .bg-green-550 { background-color: #10b981; }
        .bg-red-550 { background-color: #ef4444; }
        .bg-blue-550 { background-color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default Toast;
