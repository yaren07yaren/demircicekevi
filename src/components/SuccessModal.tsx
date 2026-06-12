/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryInfo, CartItem } from "../types";
import { X, CheckCircle, Smartphone, MapPin, Calendar, Clock, CreditCard, MessageSquare, Heart, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryInfo: DeliveryInfo;
  cartItems: CartItem[];
  subtotal: number;
  paymentMethodText: string;
  orderNumber: string;
  onSendToWhatsApp: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  deliveryInfo,
  cartItems,
  subtotal,
  paymentMethodText,
  orderNumber,
  onSendToWhatsApp
}: SuccessModalProps) {
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
            className="fixed inset-0 bg-[#201a1a] z-[200] backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative font-sans flex flex-col max-h-[90vh]"
            >
              {/* Floral Decorative Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-[#874c66] via-[#d18ba8] to-[#874c66]" />

              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-[#514348]/60 hover:text-[#874c66] hover:bg-[#f7ebeb] rounded-full transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Header Accomplishment */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200 text-green-600 mb-2">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#874c66]">Siparişiniz Alındı</h3>
                  <p className="text-xs text-[#514348]">
                    Tasarım yolculuğumuz başlıyor! En taze çiçeklerimiz sizin için dizayn ediliyor.
                  </p>
                  
                  <div className="inline-block bg-[#fff8f7] px-4 py-1.5 rounded-full border border-[#ebe0df]/70">
                    <span className="text-[10px] font-mono font-semibold text-[#874c66] uppercase tracking-wider">
                      Sipariş No: #{orderNumber}
                    </span>
                  </div>
                </div>

                {/* Printed Receipt Style Block */}
                <div className="bg-[#fff8f7] rounded-xl p-5 border border-dashed border-[#ebe0df] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#ebe0df]/60 pb-3 text-xs font-semibold text-[#874c66]">
                    <FileText size={14} />
                    <span>SİPARİŞ ÖZETİ</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {cartItems.map((item) => (
                      <div key={item.flower.id} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-[#ebe0df]/30">
                        <div className="flex items-center gap-2">
                          <img 
                            src={item.flower.image} 
                            alt={item.flower.name} 
                            className="w-10 h-12 object-cover rounded-md border"
                          />
                          <div>
                            <p className="font-semibold text-[#201a1a]">{item.flower.name}</p>
                            <p className="text-[10px] text-[#514348]/70">{item.quantity} Adet - {item.flower.price.toLocaleString("tr-TR")} ₺</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#874c66]">
                          {(item.flower.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-[#ebe0df]/60 pt-3 text-xs">
                    <div className="flex justify-between text-[#514348]">
                      <span>Ödeme Şekli:</span>
                      <span className="font-semibold text-[#201a1a]">{paymentMethodText}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#874c66] pt-1">
                      <span>Genel Toplam:</span>
                      <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Message Draft Preview (as requested by the user, matching the structure and WhatsApp preview aesthetics) */}
                <div className="space-y-3">
                  <div className="text-xs font-bold tracking-wider text-[#201a1a] uppercase flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-pulse" />
                    Admine İletilecek WhatsApp Mesaj Taslağı
                  </div>
                  
                  <div className="bg-[#EFEAE2] rounded-xl overflow-hidden border border-[#d1c7bd]">
                    {/* Mock WhatsApp Chat Header */}
                    <div className="bg-[#075E54] px-4 py-2.5 flex items-center justify-between text-white text-xs font-sans">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                          DÇ
                        </div>
                        <div>
                          <p className="font-semibold leading-none text-white">Demir Çiçek Evi</p>
                          <p className="text-[9px] opacity-80 leading-none mt-1">Yönetici & Destek</p>
                        </div>
                      </div>
                      <span className="text-[9px] opacity-70">çevrimiçi</span>
                    </div>

                    {/* Mock Chat Body */}
                    <div className="p-4 bg-[#efeae2]/90 min-h-[160px] max-h-[260px] overflow-y-auto text-xs space-y-3">
                      <div className="bg-[#DCF8C6] ml-auto max-w-[90%] rounded-lg p-3.5 text-[#303030] shadow-sm relative font-sans whitespace-pre-wrap leading-relaxed text-[11px] border border-[#cbebb0] text-left">
                        <p className="font-serif font-bold text-gray-800">Merhaba, web siteniz üzerinden yeni bir sipariş vermek istiyorum:</p>
                        {"\n"}
                        <p className="font-bold text-emerald-800">📋 SİPARİŞ DETAYLARI</p>
                        <p>---------------------------</p>
                        <p>👤 <strong>Müşteri Adı:</strong> {deliveryInfo.fullName || "-"}</p>
                        <p>📞 <strong>İletişim Tel:</strong> +90 5{deliveryInfo.phone || "-"}</p>
                        <p>📍 <strong>Teslimat Adresi:</strong> {deliveryInfo.address || "-"}</p>
                        <p>📅 <strong>Teslimat Tarihi:</strong> {deliveryInfo.date ? new Date(deliveryInfo.date).toLocaleDateString("tr-TR") : "-"}</p>
                        <p>⏰ <strong>Saat Dilimi:</strong> {deliveryInfo.timeSlot || "-"}</p>
                        <p>💌 <strong>Kart Mektubu / Not:</strong> "{deliveryInfo.note || 'Bulunmuyor'}"</p>
                        {"\n"}
                        <p className="font-bold text-emerald-800">🛍️ SEPETTEKİ ÜRÜNLER</p>
                        <p>---------------------------</p>
                        {cartItems.map((item, idx) => (
                          <p key={idx}>• {item.flower.name} ({item.flower.category}) x {item.quantity} Adet - {(item.flower.price * item.quantity).toLocaleString("tr-TR")} ₺</p>
                        ))}
                        {"\n"}
                        <p>💵 <strong>Toplam Tutar:</strong> <span className="font-bold text-amber-900">{subtotal.toLocaleString("tr-TR")} ₺</span></p>
                        
                        <span className="block text-[8px] opacity-60 text-right mt-2 font-mono">
                          {new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information Details */}
                <div className="space-y-3 text-xs">
                  <div className="text-xs font-bold tracking-wider text-[#201a1a] uppercase">
                    Teslimat Bilgileri
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-[#fdf1f0]/40 p-2.5 rounded-lg border border-[#ebe0df]/20">
                      <Smartphone size={14} className="text-[#874c66] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#514348]/70">Alıcı & Telefon</p>
                        <p className="font-semibold text-[#201a1a]">{deliveryInfo.fullName || "-"}</p>
                        <p className="text-[#514348]">{deliveryInfo.phone || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#fdf1f0]/40 p-2.5 rounded-lg border border-[#ebe0df]/20">
                      <Calendar size={14} className="text-[#874c66] shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#514348]/70">Tarih & Saat</p>
                        <p className="font-semibold text-[#201a1a]">
                          {deliveryInfo.date ? new Date(deliveryInfo.date).toLocaleDateString("tr-TR") : "-"}
                        </p>
                        <p className="text-[#514348]">{deliveryInfo.timeSlot}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex items-start gap-2 bg-[#fdf1f0]/40 p-2.5 rounded-lg border border-[#ebe0df]/20">
                      <MapPin size={14} className="text-[#874c66] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[#514348]/70">Gaziantep Teslimat Adresi</p>
                        <p className="text-[#201a1a] font-medium leading-relaxed">{deliveryInfo.address || "-"}</p>
                      </div>
                    </div>

                    {deliveryInfo.note && (
                      <div className="sm:col-span-2 flex items-start gap-2 bg-[#fff8f7] p-2.5 rounded-lg border border-[#ebe0df]/30">
                        <Heart size={14} className="text-[#874c66] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-[#514348]/70">Kart Mesajı (Sipariş Notu)</p>
                          <p className="text-italic text-[#514348] font-medium font-serif">"{deliveryInfo.note}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Call To Action to WhatsApp */}
                <div className="space-y-3 pt-3 border-t border-[#ebe0df]/60">
                  <p className="text-[11px] text-[#514348] text-center leading-relaxed">
                    Siparişinizi doğrudan WhatsApp onay hattımıza göndererek hazırlık sürecini <strong>hızlandırabilir</strong> ve anlık durumu sorgulayabilirsiniz.
                  </p>
                  
                  <button 
                    onClick={onSendToWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-semibold text-xs uppercase cursor-pointer transition-transform duration-205 active:scale-98 shadow-md"
                  >
                    <MessageSquare size={16} fill="currentColor" />
                    <span>WhatsApp Onayı İle Süreci Başlat</span>
                  </button>
                  
                  <button 
                    onClick={onClose}
                    className="w-full bg-[#f7ebeb] hover:bg-[#874c66] text-[#874c66] hover:text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Siparişi Kapat ve Gezinmeye Devam Et
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
