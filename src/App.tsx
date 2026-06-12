/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  ShoppingBag, 
  Sparkles, 
  Calendar, 
  Clock, 
  CreditCard, 
  Building2, 
  Truck, 
  Heart, 
  Lock, 
  MessageSquare,
  Gift,
  ArrowRight,
  Info,
  Check,
  AlertCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { FlowerItem, CartItem, DeliveryInfo, PaymentMethod, CreditCardInfo } from "./types";
import { FLOWER_PRODUCTS, GA_TIME_SLOTS } from "./data";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import BankTransferInfo from "./components/BankTransferInfo";
import SuccessModal from "./components/SuccessModal";
import AdminPanel from "./components/AdminPanel";

// Predefined Quick Cart Messages templates
const CARD_TEMPLATES = [
  "Seni her geçen gün daha çok seviyorum. Mutlu yıllarımız olsun!",
  "Hayatıma kattığın tüm renkler ve güzellikler için teşekkür ederim.",
  "Çok geçmiş olsun, en kısa sürede sağlığına kavuşup aramıza dönmen dileğiyle.",
  "Yeni işinde başarılar dilerim, her şey hayal ettiğinden daha güzel olsun!",
  "Günün bu taze çiçekler kadar canlı ve huzurlu geçsin. İyi ki varsın..."
];

export default function App() {
  // State variables
  const [view, setView] = useState<"store" | "admin">("store");

  // Load dynamic products from localStorage or fall back to pre-seeded list
  const [products, setProducts] = useState<FlowerItem[]>(() => {
    const saved = localStorage.getItem("demir_cicek_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return FLOWER_PRODUCTS;
      }
    }
    return FLOWER_PRODUCTS;
  });

  const handleUpdateProducts = (newProducts: FlowerItem[]) => {
    setProducts(newProducts);
    localStorage.setItem("demir_cicek_products", JSON.stringify(newProducts));
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"bouquet" | "gift">("bouquet");
  
  // Checkout Forms state
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: "",
    phone: "",
    address: "",
    date: "",
    timeSlot: "09:00 - 12:00",
    note: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  
  const [cardInfo, setCardInfo] = useState<CreditCardInfo>({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  });

  // Promotional parameters
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccessMessage, setPromoSuccessMessage] = useState("");
  const [promoErrorMessage, setPromoErrorMessage] = useState("");

  // Modals / Details togglers
  const [selectedFlowerDetails, setSelectedFlowerDetails] = useState<FlowerItem | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [completedOrderNo, setCompletedOrderNo] = useState("");
  
  // Notification states
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Auto pre-populate cart with mockup items to match 480 ₺ total on boot!
  useEffect(() => {
    const item2 = products.find(f => f.id === "2");
    if (item2) {
      setCart([
        { flower: item2, quantity: 1 }
      ]);
    }
  }, [products]);

  // Show a beautifully timed toast notification
  const notify = (message: string, type: "success" | "info" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (flower: FlowerItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.flower.id === flower.id);
      if (existing) {
        notify(`Sepetteki ${flower.name} adedi artırıldı.`);
        return prev.map(item => 
          item.flower.id === flower.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      notify(`${flower.name} sepetinize eklendi!`);
      return [...prev, { flower, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (flowerId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.flower.id === flowerId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (flowerId: string) => {
    setCart(prev => {
      const item = prev.find(i => i.flower.id === flowerId);
      if (item) {
        notify(`${item.flower.name} sepetinizden kaldırıldı.`, "info");
      }
      return prev.filter(i => i.flower.id !== flowerId);
    });
  };

  // Toggle Favorite list
  const handleToggleFavorite = (flowerId: string) => {
    setFavorites(prev => {
      const isAlreadyFav = prev.includes(flowerId);
      const flower = products.find(f => f.id === flowerId);
      if (isAlreadyFav) {
        if (flower) notify(`${flower.name} favorilerden kaldırıldı.`, "info");
        return prev.filter(id => id !== flowerId);
      } else {
        if (flower) notify(`${flower.name} favorilerinize eklendi! ✨`);
        return [...prev, flowerId];
      }
    });
  };

  // Calculated Financial Values
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.flower.price * item.quantity), 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const finalTotal = useMemo(() => {
    const calculated = subtotal - discountAmount;
    return calculated < 0 ? 0 : calculated;
  }, [subtotal, discountAmount]);

  // Handle promo code code apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoSuccessMessage("");
    setPromoErrorMessage("");

    const code = promoCode.trim().toUpperCase();
    if (code === "GAZIANTEP27") {
      setDiscountPercent(15);
      setPromoSuccessMessage("Tebrikler! Gaziantep Özel %15 İndirimi Kaydedildi.");
      notify("GAZIANTEP27 kupon kodu uygulandı! 🌸");
    } else if (code === "BAHAR10") {
      setDiscountPercent(10);
      setPromoSuccessMessage("%10 Bahar Esintisi İndirimi Tanımlandı.");
      notify("BAHAR10 kupon kodu uygulandı!");
    } else if (code === "") {
      setPromoErrorMessage("Lütfen geçerli bir kod yazınız.");
    } else {
      setPromoErrorMessage("Geçersiz veya süresi dolmuş kupon kodu.");
    }
  };

  // Quick Card Message fill in helper
  const handleFillTemplate = (template: string) => {
    setDeliveryInfo(prev => ({ ...prev, note: template }));
    notify("Özel kart mesajı şablondan uygulandı!");
  };

  // Format Card Number (adds groups of four spaces)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      value = parts.join(" ");
    } else {
      value = value.substring(0, 19);
    }
    setCardInfo(prev => ({ ...prev, cardNumber: value }));
  };

  // Format Expiry Date (AAYY -> AA / YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + " / " + value.substring(2, 4);
    }
    setCardInfo(prev => ({ ...prev, expiryDate: value.substring(0, 7) }));
  };

  // Format Phone (automatic formatter)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.startsWith("0")) value = value.substring(1);
    if (value.length > 10) value = value.substring(0, 10);
    setDeliveryInfo(prev => ({ ...prev, phone: value }));
  };

  // Display human-readable formatted phone
  const formattedPhoneNumber = (raw: string) => {
    if (!raw) return "";
    let formatted = "0 (5";
    if (raw.length > 3) {
      formatted += raw.substring(1, 4) + ") " + raw.substring(4, 7);
    } else {
      formatted += raw.substring(1);
    }
    if (raw.length > 6) {
      formatted += " " + raw.substring(7, 9);
    }
    if (raw.length > 8) {
      formatted += " " + raw.substring(9, 11);
    }
    return formatted;
  };

  // Scroll smoothly to a section matching ids
  const handleScrollToId = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "hediyelikler") {
      setActiveCategory("gift");
      const el = document.getElementById("buketler");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (id === "buketler") {
      setActiveCategory("bouquet");
      const el = document.getElementById("buketler");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsCartOpen(false);
  };

  // Validate fields and finalize Order placement
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      notify("Sepetiniz boş. Lütfen önce buket ekleyin.", "error");
      return;
    }

    if (!deliveryInfo.fullName.trim()) {
      notify("Lütfen Teslimat Adı Soyadı alanını doldurunuz.", "error");
      return;
    }

    if (deliveryInfo.phone.length < 10) {
      notify("Lütfen geçerli 10 haneli bir telefon numarası giriniz.", "error");
      return;
    }

    if (!deliveryInfo.address.trim()) {
      notify("Lütfen Gaziantep teslimat adresi bilgisini yazınız.", "error");
      return;
    }

    if (!deliveryInfo.date) {
      notify("Lütfen teslim edilmesini istediğiniz tarihi seçiniz.", "error");
      return;
    }

    // Generate random order number matching boutique standards
    const randomOrder = "DM" + Math.floor(100000 + Math.random() * 900000);
    setCompletedOrderNo(randomOrder);
    setIsSuccessModalOpen(true);
    notify("Tebrikler! Siparişiniz başarıyla oluşturuldu.");
    handleWhatsAppRedirect(randomOrder);
  };

  // Create deep link for sending order receipt confirmation text straight to WhatsApp!
  const handleWhatsAppRedirect = (orderNo?: string) => {
    const currentOrderNo = orderNo || completedOrderNo || "Yeni";
    const formattedDate = deliveryInfo.date ? new Date(deliveryInfo.date).toLocaleDateString("tr-TR") : "";
    const itemsDescription = cart.map(item => `• ${item.flower.name} (${item.flower.category}) x ${item.quantity} Adet - ${(item.flower.price * item.quantity).toLocaleString("tr-TR")} ₺`).join("\n");
    
    const messageText = `Merhaba, web siteniz üzerinden yeni bir sipariş vermek istiyorum:\n\n` +
      `📋 *SİPARİŞ DETAYLARI*\n` +
      `---------------------------\n` +
      `👤 *Müşteri Adı:* ${deliveryInfo.fullName || "-"}\n` +
      `📞 *İletişim Tel:* +90 5${deliveryInfo.phone || "-"}\n` +
      `📍 *Teslimat Adresi:* ${deliveryInfo.address || "-"}\n` +
      `📅 *Teslimat Tarihi:* ${formattedDate || "-"}\n` +
      `⏰ *Saat Dilimi:* ${deliveryInfo.timeSlot || "-"}\n` +
      `💌 *Kart Mektubu / Not:* "${deliveryInfo.note || 'Bulunmuyor'}"\n\n` +
      `🛍️ *SEPETTEKİ ÜRÜNLER*\n` +
      `---------------------------\n` +
      `${itemsDescription}\n\n` +
      `💵 *Toplam Tutar:* ${finalTotal.toLocaleString("tr-TR")} ₺`;

    const encodedText = encodeURIComponent(messageText);

    // Opens wa.me linkage
    window.open(`https://wa.me/905051580564?text=${encodedText}`, "_blank");
  };

  // Close order summary modal and refresh page state
  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    setCart([]);
    setDeliveryInfo({
      fullName: "",
      phone: "",
      address: "",
      date: "",
      timeSlot: "09:00 - 12:00",
      note: ""
    });
    setCardInfo({
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvc: ""
    });
    setPromoCode("");
    setDiscountPercent(0);
    setPromoSuccessMessage("");
    setPromoErrorMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paymentTextFormatted = "WhatsApp ile Sipariş";

  if (view === "admin") {
    return (
      <AdminPanel 
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onClose={() => setView("store")}
      />
    );
  }

  return (
    <div className="min-h-screen text-[#201a1a] selection:bg-[#d18ba8] bg-[#fff8f7] pb-0">
      
      {/* Header Sticky Navigation */}
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToSection={handleScrollToId}
        favoriteCount={favorites.length}
      />

      {/* Floating Alerts notifications wrapper */}
      <div className="fixed top-24 right-4 z-[99] max-w-sm w-full pointer-events-none space-y-2">
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border text-xs font-sans font-medium pointer-events-auto flex items-center gap-3 bg-white ${
                notification.type === "success" ? "border-green-200 text-green-900 shadow-green-100/40" :
                notification.type === "error" ? "border-red-200 text-red-900 shadow-red-100/40" :
                "border-blue-200 text-blue-900 shadow-blue-100/40"
              }`}
            >
              {notification.type === "success" && <Sparkles size={16} className="text-green-600 shrink-0" />}
              {notification.type === "error" && <AlertCircle size={16} className="text-red-600 shrink-0" />}
              {notification.type === "info" && <Info size={16} className="text-blue-600 shrink-0" />}
              <span>{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* App Main Body */}
      <div className="pt-28 font-sans">
        
        {/* Editorial Hero Frame intro */}
        <section className="px-6 md:px-10 py-12 max-w-[1440px] mx-auto text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#874c66] uppercase block">
              Gaziantep Demir Çiçek Evi
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#201a1a] leading-[1.1] tracking-tight font-medium">
              Siparişinizi <br />
              <span className="italic font-normal text-[#874c66]">Tamamlayın</span>
            </h1>
            <p className="text-[#514348] text-sm md:text-base max-w-2xl leading-relaxed">
              Hayatınızdaki özel anları unutulmaz kılmak için son bir adım kaldı. Bilgilerinizi güvenle girerek, Gaziantep'teki sevdiklerinize ulaştıracağımız Premium çiçek tasarımını hemen yola çıkarın.
            </p>
          </motion.div>
        </section>

        {/* Dynamic Bouquet Browsing Carousel Shelf */}
        <section id="buketler" className="bg-white/40 border-y border-[#ebe0df]/55 py-12 px-6 md:px-10">
          <div className="max-w-[1440px] mx-auto space-y-8">
            {/* Category Selector Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-b border-[#ebe0df]/40 pb-6">
              <button
                onClick={() => setActiveCategory("bouquet")}
                className={`px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 pointer-events-auto ${
                  activeCategory === "bouquet"
                    ? "bg-[#874c66] text-white shadow-md scale-102"
                    : "bg-white text-[#514348] border border-[#ebe0df] hover:border-[#874c66] hover:bg-[#fdf1f0]"
                }`}
              >
                💐 Çiçek Buketleri
              </button>
              <button
                onClick={() => setActiveCategory("gift")}
                className={`px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 pointer-events-auto ${
                  activeCategory === "gift"
                    ? "bg-[#874c66] text-white shadow-md scale-102"
                    : "bg-white text-[#514348] border border-[#ebe0df] hover:border-[#874c66] hover:bg-[#fdf1f0]"
                }`}
              >
                🎁 Hediyelik Ürünler
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {products.filter((flower) => {
                const itemType = flower.type || "bouquet";
                return itemType === activeCategory;
              }).map((flower) => {
                const isFav = favorites.includes(flower.id);
                return (
                  <ProductCard 
                    key={flower.id}
                    flower={flower}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={isFav}
                    onShowDetails={(flower) => setSelectedFlowerDetails(flower)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrated Column Layout Checkout Flow */}
        <section className="px-6 md:px-10 py-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Box: My Cart List & Delivery Info (8/12 Columns) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Sepetim Item List */}
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-[#201a1a] flex items-center gap-2">
                  <span>Sepetim</span>
                  <span className="text-xl text-[#874c66] font-sans font-medium">({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                </h2>
                
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="p-8 bg-white border border-[#ebe0df]/55 rounded-2xl text-center space-y-4">
                      <div className="w-16 h-16 bg-[#fdf1f0] rounded-full flex items-center justify-center text-[#874c66] mx-auto text-xl">🌸</div>
                      <p className="text-sm text-[#514348]/80 leading-relaxed font-semibold">Sepetiniz boş. Lütfen yukarıdan harika buketlerimizi ekleyin.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div 
                        key={item.flower.id} 
                        className="bg-white rounded-2xl p-5 border border-[#ebe0df]/55 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col sm:flex-row gap-5 relative items-center justify-between"
                      >
                        <div className="flex gap-5 items-center w-full">
                          {/* Image */}
                          <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#f7ebeb] shrink-0 border border-[#ebe0df]/40 shadow-2xs">
                            <img 
                              src={item.flower.image} 
                              alt={item.flower.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          {/* Description */}
                          <div className="flex-grow space-y-1 text-left">
                            <h3 className="font-serif text-lg font-bold text-[#201a1a] leading-tight">
                              {item.flower.name}
                            </h3>
                            <p className="text-xs text-[#874c66] font-mono tracking-wider">
                              {item.flower.category}
                            </p>
                            
                            {/* Price */}
                            <p className="font-serif text-base font-bold text-[#201a1a] pt-1">
                              {item.flower.price.toLocaleString("tr-TR")} ₺
                            </p>

                            {/* Selector */}
                            <div className="flex items-center bg-[#fdf1f0] rounded-lg px-2.5 py-1.5 border border-[#ebe0df]/40 gap-3 w-fit mt-3">
                              <button 
                                onClick={() => handleUpdateQuantity(item.flower.id, -1)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors text-[#874c66] hover:bg-[#ebe0df]/40 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold text-[#201a1a] min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.flower.id, 1)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[#874c66] hover:bg-[#ebe0df]/40 text-xs font-bold transition-colors cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Trash icon */}
                        <button 
                          onClick={() => handleRemoveItem(item.flower.id)}
                          className="absolute top-5 right-5 text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all cursor-pointer"
                          title="Ürünü sepetten çıkar"
                        >
                          <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Delivery info form */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#ebe0df]/55 shadow-2xs space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#874c66] text-white flex items-center justify-center font-bold font-serif text-base shadow-xs">
                    ✍️
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#201a1a]">Teslimat Bilgileri</h3>
                    <p className="text-xs text-[#514348]/80 mt-0.5">Gönderim yapılacak Gaziantep adresi ve alıcı bilgileri</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase ml-1 block">
                      ALICI ADI SOYADI
                    </label>
                    <input 
                      type="text"
                      required
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo(p => ({ ...p, fullName: e.target.value }))}
                      placeholder="Örn. Sude Bayar"
                      className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 text-sm transition-all focus:outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase ml-1 block">
                      ALICI TELEFON NUMARASI
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sm text-[#201a1a]/60 font-medium font-sans">
                        +90
                      </span>
                      <input 
                        type="tel"
                        required
                        value={deliveryInfo.phone}
                        onChange={handlePhoneChange}
                        placeholder="5XX XXX XX XX"
                        className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl pl-14 pr-4 text-sm transition-all focus:outline-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Address field (Textarea) */}
                  <div className="space-y-1.5 md:col-span-2 text-left">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase ml-1 block">
                      TESLİMAT ADRESİ (GAZİANTEP İÇİ)
                    </label>
                    <textarea 
                      required
                      rows={3}
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo(p => ({ ...p, address: e.target.value }))}
                      placeholder="Şehitkamil veya Şahinbey mahallesi, cadde, numara, daire ve varsa sitenizin adını detaylı yazınız..."
                      className="w-full bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Delivery Day (Date picker) */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase ml-1 block">
                      TESLİMAT TARİHİ
                    </label>
                    <div className="relative font-sans">
                      <input 
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={deliveryInfo.date}
                        className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 text-sm transition-all focus:outline-none font-sans"
                        onChange={(e) => setDeliveryInfo(p => ({ ...p, date: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Delivery Time ranges (Select) */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase ml-1 block">
                      TESLİMAT SAAT ARALIĞI
                    </label>
                    <select 
                      value={deliveryInfo.timeSlot}
                      onChange={(e) => setDeliveryInfo(p => ({ ...p, timeSlot: e.target.value }))}
                      className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 text-sm transition-all focus:outline-none font-sans appearance-none cursor-pointer"
                    >
                      {GA_TIME_SLOTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Card note / Greeting text message */}
                  <div className="space-y-1.5 md:col-span-2 text-left font-sans">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block">
                        SİPARİŞ NOTU (KART MESAJI)
                      </label>
                      <span className="text-[10px] font-mono text-[#514348]/60">
                        {deliveryInfo.note.length}/250 Karakter
                      </span>
                    </div>
                    <textarea 
                      maxLength={250}
                      rows={2}
                      value={deliveryInfo.note}
                      onChange={(e) => setDeliveryInfo(p => ({ ...p, note: e.target.value }))}
                      placeholder="Çiçeğinizin yanında gidecek zarif kart mesajınız... Sevdiklerinizi duygulandıracak bir şeyler yazabilirsiniz..."
                      className="w-full bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none leading-relaxed font-sans"
                    />

                    {/* Pre-made Templates Selection Carousel */}
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-medium text-[#874c66] block">
                        Hazır Şablonlar (Eklemek için Tıklayın):
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth h-12 -mx-1 px-1">
                        {CARD_TEMPLATES.map((tpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleFillTemplate(tpl)}
                            className="bg-[#fdf1f0] hover:bg-[#874c66] hover:text-white text-[#874c66] text-[10px] font-medium px-4 py-1.5 rounded-full border border-[#ebe0df]/50 shrink-0 transition-all cursor-pointer inline-block whitespace-nowrap self-start"
                          >
                            Şablon {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Box: Sticky Order Totals & Summary Panel (4/12 Columns) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-[#ffffff] border border-[#ebe0df]/60 shadow-md rounded-2xl p-6 md:p-8 space-y-6 text-left font-sans">
                <div className="border-b border-[#ebe0df]/60 pb-4">
                  <h2 className="font-serif text-2xl font-semibold text-[#201a1a]">Sipariş Özeti</h2>
                </div>

                {/* Pricing totals breakdown list */}
                <div className="space-y-4 text-sm font-sans">
                  <div className="flex justify-between text-[#514348]">
                    <span>Ara Toplam</span>
                    <span className="font-bold text-[#201a1a]">{subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>

                  <div className="flex justify-between text-[#514348] items-center">
                    <span>Teslimat (Gaziantep İçi)</span>
                    <span className="text-[#201a1a] font-normal text-xs uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded text-green-700 font-semibold">
                      Ücretsiz
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 bg-green-50/50 p-2.5 rounded font-medium text-xs">
                      <span>Kupon İndirimi (%{discountPercent})</span>
                      <span className="font-bold">-{discountAmount.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  )}

                  <div className="border-t border-[#ebe0df]/40 pt-4 flex justify-between items-center text-base">
                    <span className="text-lg font-sans text-[#201a1a] font-medium">Toplam</span>
                    <span className="text-xl font-bold font-serif text-[#201a1a] tracking-tight">
                      {finalTotal.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform duration-205 hover:scale-[1.01] active:scale-98 cursor-pointer shadow-md"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.874-1.874-4.36-2.903-7.002-2.904-5.439 0-9.863 4.414-9.866 9.865-.001 2.016.528 3.99 1.533 5.725l-.946 3.456 3.548-.93zm11.362-5.043c-.366-.183-2.161-1.067-2.5-1.19-.338-.124-.585-.183-.831.183-.246.367-.954 1.19-1.169 1.438-.215.247-.43.274-.796.091-.366-.183-1.547-.571-2.947-1.819-1.09-.971-1.826-2.17-2.04-2.536-.215-.366-.023-.564.16-.745.164-.163.366-.427.549-.64.183-.213.244-.366.366-.61.122-.244.061-.458-.031-.64-.092-.183-.831-2.003-1.139-2.743-.3-.722-.605-.623-.831-.635-.215-.011-.462-.013-.708-.013-.246 0-.646.092-.985.462-.338.367-1.293 1.267-1.293 3.09 0 1.823 1.323 3.581 1.507 3.826.184.245 2.604 3.976 6.307 5.572.88.38 1.567.607 2.103.777.886.28 1.691.24 2.327.145.71-.106 2.161-.882 2.467-1.737.307-.852.307-1.583.215-1.737-.092-.153-.338-.244-.704-.427z"/>
                    </svg>
                    <span>WhatsApp ile Tamamla</span>
                  </button>

                  <p className="text-[11px] text-gray-500 text-center leading-relaxed mt-3">
                    Siparişiniz WhatsApp üzerinden oluşturulacak ve teyit edilecektir.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Brand Information Section */}
        <section id="hakkimizda" className="bg-[#fff8f7] py-20 px-6 md:px-10 border-t border-[#ebe0df]/40">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#874c66] uppercase block">
              Zanaat & Tarih
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201a1a] font-semibold leading-tight">
              Gaziantep’in En Zarif <br />
              <span className="italic font-normal text-[#874c66]">Tasarım Çiçek Atölyesi</span>
            </h2>
            <div className="w-12 h-1 bg-[#874c66] mx-auto rounded" />
            <p className="text-xs sm:text-sm text-[#514348] leading-relaxed max-w-2xl mx-auto">
              Demir Çiçek Evi, felsefesi olan çiçek aranjmanları tasarlayan Gaziantep merkezli elit bir tasarım evidir. Amacımız sadece çiçek satmak değil, hayatın en değerli günlerine; kelimelerin yetersiz kaldığı asil anlara çiçeklerin doğal büyüleyici dokusunu lüks zanaatkarlıkla işlemektir. Her buket, deneyimli ustalarımız tarafından sabah taze gelen tomurcuklar arasından özenle elenerek hazırlanır.
            </p>
          </div>
        </section>

      </div>

      {/* Cart Drawer side navigation bar */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        subtotal={subtotal}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          handleScrollToId("buketler");
          setTimeout(() => {
            const checkoutHeading = document.getElementById("buketler");
            if (checkoutHeading) checkoutHeading.scrollIntoView({ behavior: "smooth" });
          }, 350);
        }}
        onQuickWhatsApp={() => {
          if (cart.length === 0) {
            notify("Kutunuz boş.", "error"); return;
          }
          const randomOrder = "DM" + Math.floor(100000 + Math.random() * 900000);
          setCompletedOrderNo(randomOrder);
          handleWhatsAppRedirect();
        }}
      />

      {/* Success Modal printed invoice receipt layout drawer */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccess}
        deliveryInfo={deliveryInfo}
        cartItems={cart}
        subtotal={finalTotal}
        paymentMethodText={paymentTextFormatted}
        orderNumber={completedOrderNo}
        onSendToWhatsApp={handleWhatsAppRedirect}
      />

      {/* Details Modal on Flower click */}
      <AnimatePresence>
        {selectedFlowerDetails && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFlowerDetails(null)}
              className="fixed inset-0 bg-black z-[200] backdrop-blur-xs"
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl overflow-hidden max-w-md w-full border border-[#ebe0df]/80 shadow-2xl relative font-sans"
              >
                <div className="relative h-64 bg-slate-100">
                  <img 
                    src={selectedFlowerDetails.image} 
                    alt={selectedFlowerDetails.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setSelectedFlowerDetails(null)}
                    className="absolute top-3 right-3 p-1.5 bg-white/70 hover:bg-white text-gray-800 rounded-full cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#874c66] tracking-widest uppercase block">
                      {selectedFlowerDetails.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#201a1a] mt-1">
                      {selectedFlowerDetails.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {selectedFlowerDetails.details}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-lg font-bold text-[#874c66]">
                      {selectedFlowerDetails.price.toLocaleString("tr-TR")} ₺
                    </span>
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedFlowerDetails);
                        setSelectedFlowerDetails(null);
                      }}
                      className="bg-[#874c66] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Brand Footer */}
      <Footer onAdminClick={() => setView("admin")} />

    </div>
  );
}
