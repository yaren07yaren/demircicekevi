/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem } from "../types";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, num: number) => void;
  onRemoveItem: (id: string) => void;
  subtotal: number;
  onProceedToCheckout: () => void;
  onQuickWhatsApp: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  onProceedToCheckout,
  onQuickWhatsApp
}: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#201a1a] z-[100] backdrop-blur-xs"
          />

          {/* Drawer Wrapper */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-[110] shadow-2xl flex flex-col font-sans"
          >
            <div className="p-6 border-b border-[#ebe0df]/60 flex justify-between items-center bg-[#fff8f7]">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#874c66] flex items-center gap-2">
                  <ShoppingBag size={22} className="text-[#874c66]" />
                  Sepetim
                </h2>
                <p className="text-xs text-[#514348]/80 mt-1">Lüks Tasarımlarınızı İnceleyin</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-[#514348] hover:text-[#874c66] hover:bg-[#f7ebeb] rounded-full transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow p-6 overflow-y-auto space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#fdf1f0] flex items-center justify-center text-[#874c66] mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#201a1a] mb-2">Sepetiniz Boş</h3>
                  <p className="text-xs text-[#514348]/80 max-w-xs leading-relaxed">
                    Eşsiz tasarımlara göz atıp sepetinizi renklendirmek için buketlerimizi hemen ekleyebilirsiniz.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    key={item.flower.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-3 rounded-xl hover:bg-[#fff8f7] transition-all duration-200 border border-transparent hover:border-[#ebe0df]/40"
                  >
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#f7ebeb] flex-shrink-0 border border-[#ebe0df]/30 shadow-2xs">
                      <img 
                        src={item.flower.image || "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=cover"} 
                        alt={item.flower.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=cover";
                        }}
                      />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-grow py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-semibold text-[#201a1a] leading-tight font-sans line-clamp-1">
                            {item.flower.name}
                          </h3>
                          <button 
                            onClick={() => onRemoveItem(item.flower.id)}
                            className="text-[#514348]/50 hover:text-red-600 p-1 rounded-full transition-colors cursor-pointer"
                            title="Ürünü Sil"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#514348]/80 tracking-wide font-medium mt-0.5">
                          {item.flower.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#874c66]">
                          {(item.flower.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                        
                        <div className="flex items-center bg-[#f7ebeb] rounded-full px-2 py-1 border border-[#ebe0df]/40 gap-3 scale-95">
                          <button 
                            disabled={item.quantity <= 1}
                            onClick={() => onUpdateQuantity(item.flower.id, -1)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                              item.quantity <= 1 ? "text-[#514348]/30 cursor-not-allowed" : "text-[#874c66] hover:bg-[#ebe0df] cursor-pointer"
                            }`}
                          >
                            <Minus size={11} strokeWidth={2.5} />
                          </button>
                          
                          <span className="text-xs font-bold text-[#201a1a] min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          
                          <button 
                            onClick={() => onUpdateQuantity(item.flower.id, 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[#874c66] hover:bg-[#ebe0df] text-xs transition-colors cursor-pointer"
                          >
                            <Plus size={11} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Calculations and Actions */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#ebe0df]/60 bg-[#fff8f7] space-y-4 shadow-[0_-4px_12px_rgba(44,38,38,0.03)]">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#514348]">Ara Toplam</span>
                    <span className="font-bold text-[#201a1a]">{subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#514348]">Teslimat Ücreti</span>
                    <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider text-[10px]">
                      Ücretsiz
                    </span>
                  </div>
                  <div className="border-t border-[#ebe0df]/60 pt-3 flex justify-between items-center">
                    <span className="text-[#201a1a] font-serif text-lg font-medium">Toplam</span>
                    <span className="text-lg font-bold text-[#874c66] tracking-tight">
                      {subtotal.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button 
                    onClick={onProceedToCheckout}
                    className="w-full bg-[#874c66] hover:bg-[#6f3b52] text-white py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-transform duration-205 active:scale-98 cursor-pointer text-center block"
                  >
                    ÖDEMEYE GEÇ
                  </button>
                  
                  <button 
                    onClick={onQuickWhatsApp}
                    className="w-full flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200/50 hover:bg-green-100/50 py-2.5 rounded-xl transition-all font-semibold text-xs cursor-pointer active:scale-98"
                  >
                    <MessageSquare size={14} className="text-green-600" />
                    <span>WhatsApp ile Hızlı Sipariş Ver</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
