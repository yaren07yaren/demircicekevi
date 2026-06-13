/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from "react";
import { 
  Lock, 
  Search, 
  Trash2, 
  Edit, 
  Plus, 
  X, 
  Grid, 
  LogOut, 
  ArrowLeft, 
  Upload, 
  Sparkles,
  ShoppingBag,
  Eye,
  EyeOff,
  Gift
} from "lucide-react";
import { FlowerItem } from "../types";

interface AdminPanelProps {
  products: FlowerItem[];
  onUpdateProducts: (newProducts: FlowerItem[]) => void;
  onClose: () => void;
}

export default function AdminPanel({ products, onUpdateProducts, onClose }: AdminPanelProps) {
  // Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("demir_admin_logged_in") === "true";
  });
  const [authError, setAuthError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [adminTab, setAdminTab] = useState<"bouquets" | "gifts">("bouquets");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add / Edit Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FlowerItem | null>(null);

  // Delete Confirmation state
  const [deleteConf, setDeleteConf] = useState<FlowerItem | null>(null);
  
  // Form fields state
  const [formCode, setFormCode] = useState("");
  const [formCategory, setFormCategory] = useState("Gül");
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formInStock, setFormInStock] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Hidden file input reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to map code categories
  const getSubCategory = (item: FlowerItem): string => {
    if (item.subCategory) return item.subCategory;
    if (item.type === "gift") return "Hediyelik";
    const idNum = parseInt(item.id, 10);
    if ([1, 3, 14, 15, 21, 22].includes(idNum)) return "Özel";
    if ([2, 4, 5].includes(idNum)) return "Karışık";
    return "Gül";
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Validations: email yd146070@gmail.com and password matching "Rozerin5054"
    const validEmail = "yd146070@gmail.com";
    const validPasswords = ["Rozerin5054"];

    if (email.trim() === validEmail && validPasswords.includes(password)) {
      setIsLoggedIn(true);
      localStorage.setItem("demir_admin_logged_in", "true");
    } else {
      setAuthError("şifre veya e posta yanlış");
      setTimeout(() => {
        setAuthError(null);
      }, 5000);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("demir_admin_logged_in");
  };

  // Open modal for NEW item
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormCode("");
    setFormCategory(adminTab === "gifts" ? "Hediyelik" : "Gül");
    setFormName("");
    setFormPrice(0);
    setFormImage("");
    setFormDescription("");
    setFormInStock(true);
    setFormIsFeatured(false);
    setIsModalOpen(true);
  };

  // Open modal for EDIT item
  const handleOpenEditModal = (item: FlowerItem) => {
    setEditingItem(item);
    setFormCode(item.category);
    setFormCategory(getSubCategory(item));
    setFormName(item.name);
    setFormPrice(item.price);
    setFormImage(item.image);
    setFormDescription(item.description);
    setFormInStock(item.inStock !== false); // default to true
    setFormIsFeatured(!!item.isFeatured);
    setIsModalOpen(true);
  };

  // Delete product handler
  const handleDeleteProduct = (item: FlowerItem) => {
    setDeleteConf(item);
  };

  const handleConfirmDelete = () => {
    if (deleteConf) {
      const updated = products.filter(item => item.id !== deleteConf.id);
      onUpdateProducts(updated);
      setDeleteConf(null);
    }
  };

  // Image upload via mobile gallery/computer file-system API
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Fotoğraf boyutu 10MB'dan küçük olmalıdır.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Save product (handles both Create and Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const isGiftForm = formCategory === "Hediyelik" || adminTab === "gifts";
    if (!formCode.trim()) {
      alert(isGiftForm ? "Lütfen bir ürün kodu giriniz." : "Lütfen bir buket kodu giriniz.");
      return;
    }
    if (!formName.trim()) {
      alert(isGiftForm ? "Lütfen bir ürün adı giriniz." : "Lütfen buket adı giriniz.");
      return;
    }
    if (formPrice <= 0) {
      alert("Lütfen geçerli bir fiyat giriniz.");
      return;
    }
    if (!formImage) {
      alert("Lütfen bir ürün görseli yükleyin.");
      return;
    }

    if (editingItem) {
      // Update existing
      const updated = products.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: formName,
            category: formCode,
            price: formPrice,
            image: formImage,
            description: formDescription,
            details: formDescription || item.details, // back up details
            subCategory: formCategory,
            type: formCategory === "Hediyelik" ? "gift" as const : "bouquet" as const,
            inStock: formInStock,
            isFeatured: formIsFeatured
          };
        }
        return item;
      });
      onUpdateProducts(updated);
    } else {
      // Create new product
      const newId = String(Date.now());
      const newFlower: FlowerItem = {
        id: newId,
        name: formName,
        category: formCode,
        price: formPrice,
        image: formImage,
        description: formDescription,
        details: formDescription,
        subCategory: formCategory,
        type: formCategory === "Hediyelik" ? "gift" : "bouquet",
        inStock: formInStock,
        isFeatured: formIsFeatured
      };
      onUpdateProducts([newFlower, ...products]);
    }

    setIsModalOpen(false);
  };

  // Dynamic calculations for stat counters
  const totalCount = products.length;
  
  const featuredCount = useMemo(() => {
    return products.filter(item => {
      // Check if isFeatured is explicitly true, or fallback to the seed items
      if (item.isFeatured !== undefined) return item.isFeatured;
      const idNum = parseInt(item.id, 10);
      return ["1", "2", "3", "7", "12", "13", "33", "34", "35"].includes(item.id);
    }).length;
  }, [products]);

  const categoriesStats = useMemo(() => {
    const stats = { ozel: 0, karisik: 0, gul: 0, mevsim: 0, hediyelik: 0 };
    products.forEach(item => {
      const scat = getSubCategory(item).toLowerCase();
      if (scat.includes("özel") || scat.includes("ozel")) stats.ozel++;
      else if (scat.includes("karışık") || scat.includes("karisik")) stats.karisik++;
      else if (scat.includes("gül") || scat.includes("gul")) stats.gul++;
      else if (scat.includes("mevsim")) stats.mevsim++;
      else if (scat.includes("hediyelik")) stats.hediyelik++;
    });
    return stats;
  }, [products]);

  // Filtered lists for Table
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // Separate bouquets and gifts based on active tab
      const isGift = item.type === "gift" || getSubCategory(item) === "Hediyelik";
      if (adminTab === "gifts" && !isGift) return false;
      if (adminTab === "bouquets" && isGift) return false;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        getSubCategory(item).toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery, adminTab]);


  // 1. LOGIN SCREEN RENDER
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fff8f7] flex flex-col justify-center items-center px-4 font-sans relative">
        <div className="absolute top-6 left-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-[#874c66] hover:text-[#514348] transition-colors pointer-events-auto cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Ana Sayfaya Dön</span>
          </button>
        </div>

        <div className="w-full max-w-lg bg-white rounded-3xl border border-[#ebe0df]/70 shadow-xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
          {/* Padlock Icon Frame */}
          <div className="mx-auto w-16 h-16 bg-[#fdf1f0] rounded-full flex items-center justify-center text-[#874c66] shadow-sm">
            <Lock size={24} />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#201a1a] tracking-tight">
              Yönetici Girişi
            </h1>
            <p className="text-xs sm:text-sm text-[#514348]/90">
              Demir Çiçek Evi yönetim paneline hoş geldiniz.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wider text-[#514348]/90 uppercase ml-1 block">
                E-posta
              </label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 text-sm transition-all focus:outline-none placeholder-gray-400"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-[11px] font-bold tracking-wider text-[#514348]/90 uppercase ml-1 block">
                Şifre
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full h-12 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] focus:ring-1 focus:ring-[#874c66] rounded-xl px-4 pr-12 text-sm transition-all focus:outline-none font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-[#874c66] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#b87f93] hover:bg-[#874c66] text-white font-bold h-12 rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer pointer-events-auto"
            >
              Giriş Yap
            </button>
          </form>

          <div className="pt-2">
            <button 
              onClick={onClose}
              className="text-xs font-semibold text-[#514348]/80 hover:text-[#874c66] transition-colors cursor-pointer block mx-auto underline decoration-dotted"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>

        {/* Custom Red Error Notification (reproduced from first user screen layout) */}
        {authError && (
          <div className="fixed bottom-6 right-6 bg-[#c23b3b] text-white px-6 py-4 rounded-xl shadow-2xl space-y-1 block max-w-sm w-full border border-red-500/30 font-sans text-left animate-bounce">
            <span className="text-xs font-bold font-serif tracking-wide block">Hata</span>
            <p className="text-xs font-medium text-red-50 text-left capitalize leading-relaxed">
              {authError}
            </p>
          </div>
        )}
      </div>
    );
  }


  // 2. MAIN ADMINISTRATION DASHBOARD RENDER
  return (
    <div className="min-h-screen bg-[#fff8f7] flex flex-col lg:flex-row font-sans text-[#201a1a] relative">
      
      {/* Mobile Sticky Navigation Header with menu symbol / toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3.5 bg-white border-b border-[#ebe0df]/70 sticky top-0 z-[100] shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-[#874c66]/10 flex items-center justify-center text-[#874c66] hover:bg-[#874c66]/15 transition-colors focus:outline-none cursor-pointer animate-pulse"
            title="Menüyü Göster"
          >
            <Grid size={20} />
          </button>
          <div className="text-left">
            <h2 className="font-serif text-base font-bold text-[#201a1a] leading-none mb-0.5">
              Yönetim
            </h2>
            <p className="text-[9px] uppercase font-bold tracking-widest text-[#874c66] leading-none">
              Demir Çiçek Evi
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="text-[#874c66] font-semibold text-xs tracking-wider uppercase transition-colors hover:text-[#514348]"
            title="Siteye Dön"
          >
            Dön
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Çıkış Yap"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay backdrop on Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-[200] backdrop-blur-3xs"
        />
      )}
      
      {/* 2.1 Sidebar Left Navigation Rail (matching mockups 2 & 3 with collapsible responsive behaviour) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[250] w-80 bg-white border-r border-[#ebe0df]/70 flex flex-col justify-between shrink-0 p-6 
        transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:min-h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        <div className="space-y-12">
          {/* Logo Brand Header & Mobile Close button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#874c66]/10 flex items-center justify-center text-[#874c66]">
                <Grid size={20} />
              </div>
              <div className="text-left">
                <h2 className="font-serif text-lg font-bold text-[#201a1a] leading-none mb-1">
                  Yönetim
                </h2>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#874c66] leading-none">
                  Demir Çiçek Evi
                </p>
              </div>
            </div>

            {/* Mobile close button inside sidebar */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              title="Kapat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-2">
            <button 
              onClick={() => {
                setAdminTab("bouquets");
                setIsSidebarOpen(false); // Auto close menu on mobile tab select
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase text-left transition-colors pointer-events-auto cursor-pointer ${
                adminTab === "bouquets" 
                  ? "bg-[#fcf0f2] text-[#874c66]" 
                  : "text-gray-600 hover:bg-[#fff8f7] hover:text-[#874c66]"
              }`}
            >
              <ShoppingBag size={16} />
              <span>Buketler</span>
            </button>

            <button 
              onClick={() => {
                setAdminTab("gifts");
                setIsSidebarOpen(false); // Auto close menu on mobile tab select
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase text-left transition-colors pointer-events-auto cursor-pointer ${
                adminTab === "gifts" 
                  ? "bg-[#fcf0f2] text-[#874c66]" 
                  : "text-gray-600 hover:bg-[#fff8f7] hover:text-[#874c66]"
              }`}
            >
              <Gift size={16} />
              <span>Hediyelik Ürünler</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="space-y-3 pt-6 border-t border-[#ebe0df]/50">
          <button 
            onClick={() => {
              onClose();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#874c66] hover:bg-[#fff8f7] rounded-xl font-medium text-xs tracking-wide text-left transition-colors pointer-events-auto cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Siteye Dön</span>
          </button>
          <button 
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-800 hover:bg-red-50/50 rounded-xl font-medium text-xs tracking-wide text-left transition-colors pointer-events-auto cursor-pointer"
          >
            <LogOut size={16} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* 2.2 Right Page Body Workspace */}
      <main className="flex-grow p-4 sm:p-8 lg:p-12 overflow-y-auto max-w-[1440px] mx-auto text-left space-y-6 sm:space-y-10 w-full overflow-x-hidden">
        
        {/* Workspace Title bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-semibold text-[#201a1a] tracking-tight">
              {adminTab === "bouquets" ? "Buket Yönetimi" : "Hediyelik Ürün Yönetimi"}
            </h1>
            <p className="text-xs text-gray-500">
              {adminTab === "bouquets" 
                ? "Tüm buketlerinizi buradan yönetebilirsiniz." 
                : "Tüm hediyelik ürünlerinizi buradan yönetebilirsiniz."}
            </p>
          </div>

          <button 
            onClick={handleOpenAddModal}
            className="bg-[#b87f93] hover:bg-[#874c66] text-white flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md pointer-events-auto cursor-pointer"
          >
            <Plus size={16} />
            <span>{adminTab === "bouquets" ? "Yeni Buket Ekle" : "Yeni Hediyelik Ekle"}</span>
          </button>
        </div>

        {/* Horizontal Dashboards Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* Stat 1: Toplam Ürün */}
          <div className="bg-white rounded-3xl border border-[#ebe0df]/60 shadow-xs p-6 flex flex-col justify-between min-h-[140px] text-left">
            <span className="text-xs font-semibold text-gray-400">
              {adminTab === "bouquets" ? "Toplam Buket" : "Toplam Hediyelik"}
            </span>
            <span className="font-serif text-5xl font-normal text-[#201a1a] leading-none mt-2">
              {products.filter(item => {
                const isGift = item.type === "gift" || getSubCategory(item) === "Hediyelik";
                return adminTab === "gifts" ? isGift : !isGift;
              }).length}
            </span>
          </div>

          {/* Stat 2: Öne Çıkanlar */}
          <div className="bg-white rounded-3xl border border-[#ebe0df]/60 shadow-xs p-6 flex flex-col justify-between min-h-[140px] text-left">
            <span className="text-xs font-semibold text-gray-400">
              {adminTab === "bouquets" ? "Öne Çıkan Buket" : "Öne Çıkan Hediyelik"}
            </span>
            <span className="font-serif text-5xl font-normal text-[#874c66] leading-none mt-2">
              {products.filter(item => {
                const isGift = item.type === "gift" || getSubCategory(item) === "Hediyelik";
                if (adminTab === "gifts" !== isGift) return false;
                if (item.isFeatured !== undefined) return item.isFeatured;
                return ["1", "2", "3", "7", "12", "13", "33", "34", "35"].includes(item.id);
              }).length}
            </span>
          </div>

          {/* Stat 3: Kategoriler distribution count */}
          <div className="bg-white rounded-3xl border border-[#ebe0df]/60 shadow-xs p-6 flex flex-col justify-between min-h-[140px] text-left">
            <span className="text-xs font-semibold text-gray-400 block mb-3">
              Kategoriler
            </span>
            <div className="flex flex-wrap gap-2 pt-1 font-sans">
              <span className="bg-[#fff8f7] text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                özel: <span className="font-bold text-[#874c66]">{categoriesStats.ozel}</span>
              </span>
              <span className="bg-[#fff8f7] text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                karışık: <span className="font-bold text-[#874c66]">{categoriesStats.karisik}</span>
              </span>
              <span className="bg-[#fff8f7] text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                gül: <span className="font-bold text-[#874c66]">{categoriesStats.gul}</span>
              </span>
              <span className="bg-[#fff8f7] text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                mevsim: <span className="font-bold text-[#874c66]">{categoriesStats.mevsim}</span>
              </span>
              {categoriesStats.hediyelik > 0 && (
                <span className="bg-[#fff8f7] text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                  hediye: <span className="font-bold text-[#874c66]">{categoriesStats.hediyelik}</span>
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Inventory list & custom search bar container */}
        <div className="bg-white rounded-3xl border border-[#ebe0df]/60 shadow-sm overflow-hidden text-left font-sans">
          
          {/* Search Header box */}
          <div className="p-6 border-b border-gray-100 flex items-center">
            <div className="relative w-full max-w-md">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={adminTab === "bouquets" ? "Buket ara (isim veya kod)..." : "Hediyelik ürün ara (isim veya kod)..."} 
                className="w-full h-11 bg-[#fff8f7] border border-[#ebe0df]/80 focus:border-[#874c66] focus:outline-none focus:ring-1 focus:ring-[#874c66] rounded-full pl-11 pr-5 text-xs transition-all placeholder-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Product Data Table matches mockups 2 & 3 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 font-semibold text-[10px] tracking-wider text-gray-400 uppercase">
                  <th className="py-3 px-3 sm:px-6 font-bold">Ürün</th>
                  <th className="py-3 px-3 sm:px-6 font-bold">Kategori</th>
                  <th className="py-3 px-3 sm:px-6 font-bold">Fiyat</th>
                  <th className="py-3 px-3 sm:px-6 font-bold">Durum</th>
                  <th className="py-3 px-3 sm:px-6 font-bold text-right pr-4 sm:pr-12">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-800">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400 text-xs font-semibold">
                      {adminTab === "bouquets" 
                        ? "Aradığınız kriterlere uygun buket bulunamadı." 
                        : "Aradığınız kriterlere uygun hediyelik ürün bulunamadı."}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item, index) => {
                    const isGift = item.type === "gift" || getSubCategory(item) === "Hediyelik";
                    const isItemFeatured = item.isFeatured !== undefined ? item.isFeatured : ["1", "2", "3", "7", "12", "13", "33", "34", "35"].includes(item.id);
                    const formattedIndex = String(index + 1).padStart(2, "0");
                    const displayName = isGift 
                      ? item.name 
                      : (item.name.includes("Buket ") ? item.name : `Buket ${formattedIndex}`);
                    
                    return (
                      <tr key={item.id} className="hover:bg-[#fff8f7]/40 transition-colors group">
                        
                        {/* 1. ÜRÜN */}
                        <td className="py-3 px-3 sm:px-6 flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#fbf5f5] shrink-0 border border-gray-100 shadow-3xs">
                            <img 
                              src={item.image || "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=cover"} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=cover";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-[#201a1a] text-xs">
                              {displayName}
                            </div>
                            <div className="text-[10px] font-mono text-gray-400 mt-0.5 uppercase tracking-wide">
                              {item.category}
                            </div>
                          </div>
                        </td>

                        {/* 2. KATEGORİ */}
                        <td className="py-3 px-3 sm:px-6">
                          <span className="text-gray-500 font-medium">
                            {getSubCategory(item)}
                          </span>
                        </td>

                        {/* 3. FİYAT */}
                        <td className="py-3 px-3 sm:px-6 font-serif text-xs font-bold text-[#201a1a] whitespace-nowrap">
                          ₺{item.price.toLocaleString("tr-TR")}
                        </td>

                        {/* 4. DURUM & BADGES */}
                        <td className="py-3 px-3 sm:px-6 space-y-1">
                          {item.inStock !== false ? (
                            <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <span>✓</span>
                              <span>Stokta</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <span>✗</span>
                              <span>Tükendi</span>
                            </div>
                          )}
                          {isItemFeatured && (
                            <div className="text-[9px] text-[#874c66] font-medium block pl-1">
                              Öne Çıkan
                            </div>
                          )}
                        </td>

                        {/* 5. İŞLEMLER (edit & delete buttons) matches mockup hover state */}
                        <td className="py-3 px-3 sm:px-6 text-right pr-4 sm:pr-12">
                          <div className="flex justify-end gap-1.5 sm:gap-2.5 opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleOpenEditModal(item)}
                              title="Düzenle"
                              className="p-1.5 sm:p-2 border border-gray-100 text-gray-500 hover:text-[#874c66] hover:bg-[#fff8f7]/30 hover:border-[#ebe0df]/80 transition-all rounded-lg cursor-pointer"
                            >
                              <Edit size={13} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item)}
                              title="Sil"
                              className="p-1.5 sm:p-2 border border-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all rounded-lg cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* 2.3 NEW AND EDIT DIALOG MODAL (matches mockups 4 & 5) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] overflow-y-auto font-sans">
          
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            
            <div className="relative transform overflow-hidden bg-white rounded-3xl border border-[#ebe0df] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-left my-8 scale-100 transition-all max-h-[90vh] overflow-y-auto">
              
              {/* Modal header */}
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#201a1a]">
                  {editingItem 
                    ? (adminTab === "bouquets" ? "Buketi Düzenle" : "Hediyelik Ürünü Düzenle") 
                    : (adminTab === "bouquets" ? "Yeni Buket Ekle" : "Yeni Hediyelik Ürün Ekle")}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 px-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Fields body */}
              <form onSubmit={handleSaveProduct} className="space-y-6">
                
                {/* Product Code & Category selection Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                      {adminTab === "bouquets" ? "Buket Kodu" : "Hediyelik Kodu"}
                    </label>
                    <input 
                      type="text"
                      required
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      placeholder={adminTab === "bouquets" ? "Örn: BK-001" : "Örn: HD-001"}
                      className="w-full h-11 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] rounded-xl px-3.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                      Kategori
                    </label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full h-11 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] rounded-xl px-3 ml-0 appearance-none cursor-pointer focus:outline-none text-xs font-sans"
                    >
                      <option value="Gül">Gül</option>
                      <option value="Özel">Özel</option>
                      <option value="Karışık">Karışık</option>
                      <option value="Mevsim">Mevsim</option>
                      <option value="Hediyelik">Hediyelik</option>
                    </select>
                  </div>
                </div>

                {/* Product Name Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                    {adminTab === "bouquets" ? "Buket Adı" : "Hediyelik Ürün Adı"}
                  </label>
                  <input 
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={adminTab === "bouquets" ? "Premium Kırmızı Gül Buketi" : "Peluş Ayıcık / Çikolata Kutusu"}
                    className="w-full h-11 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] rounded-xl px-3.5 text-xs focus:outline-none"
                  />
                </div>

                {/* Pricing (TRY) Row */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                    Fiyat (₺)
                  </label>
                  <input 
                    type="number"
                    required
                    min={1}
                    value={formPrice || ""}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    placeholder="450"
                    className="w-full h-11 bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] rounded-xl px-3.5 text-xs focus:outline-none"
                  />
                </div>

                {/* Media Image Upload box (Binds to computer file picker or direct camera on phones) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                    Görsel
                  </label>
                  <div className="border border-dashed border-[#ebe0df] bg-[#fff8f7] rounded-2xl p-6 text-center space-y-4">
                    
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {formImage ? (
                      <div className="relative w-36 h-36 mx-auto rounded-xl overflow-hidden border bg-white shadow-sm">
                        <img 
                          src={formImage} 
                          alt="Görsel önizleme" 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormImage("")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-700"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-white rounded-full border flex items-center justify-center text-gray-400">
                          <Upload size={18} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-gray-700">
                            Galeriden fotoğraf seçin
                          </p>
                          <p className="text-[10px] text-gray-400">
                            JPG, PNG, WEBP — Maks. 10MB
                          </p>
                        </div>
                      </div>
                    )}

                    <button 
                      type="button"
                      onClick={triggerFileSelect}
                      className="bg-white hover:bg-[#fff8f7] border border-[#ebe0df]/80 text-[#874c66] text-xs font-bold px-5 py-2.5 rounded-xl transition-colors inline-block"
                    >
                      Fotoğraf Seç
                    </button>
                  </div>
                </div>

                {/* Description textarea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#514348] uppercase block ml-0.5">
                    Açıklama
                  </label>
                  <textarea 
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Ürün açıklaması ve çiçek detayları veya kordon özellikleri hakkında bilgi yazınız..."
                    className="w-full bg-[#fff8f7] border border-[#ebe0df] focus:border-[#874c66] rounded-xl px-3.5 py-2 text-xs focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* State Options Switches layout */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2 select-none">
                  {/* Stokta Var Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formInStock}
                      onChange={(e) => setFormInStock(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#b87f93]" />
                    <span className="text-xs font-bold text-gray-700">Stokta Var</span>
                  </label>

                  {/* Öne Çıkar Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#b87f93]" />
                    <span className="text-xs font-bold text-gray-700">Öne Çıkanlar (Ana Sayfa)</span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="border border-[#ebe0df] hover:bg-gray-50 text-[#514348] text-xs font-bold px-6 h-11 rounded-full transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#b87f93] hover:bg-[#874c66] text-white text-xs font-bold px-6 h-11 rounded-full transition-colors shadow-sm cursor-pointer"
                  >
                    Kaydet
                  </button>
                </div>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* 2.4 CUSTOM DELETE CONFIRMATION MODAL (Evet / Hayır dialog box) */}
      {deleteConf && (
        <div className="fixed inset-0 z-[400] overflow-y-auto font-sans">
          
          {/* Backdrop overlay */}
          <div 
            onClick={() => setDeleteConf(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            
            <div className="relative transform overflow-hidden bg-white rounded-3xl border border-[#ebe0df] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 text-center my-8 scale-100 transition-all">
              
              {/* Trash/Caution Icon Frame */}
              <div className="mx-auto w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-3xs">
                <Trash2 size={24} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#201a1a] tracking-tight">
                  Ürünü Sil
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2">
                  <span className="font-mono bg-amber-50 border border-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded mr-1 uppercase">
                    {deleteConf.category}
                  </span> 
                  kodlu {deleteConf.name.toLowerCase().includes("buket") ? "" : "buketi "}<strong>"{deleteConf.name}"</strong> adlı ürünü silmek istediğinize emin misiniz?
                </p>
              </div>

              {/* Action Buttons (Evet & Hayır options layout) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setDeleteConf(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Hayır
                </button>
                <button 
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-[#c23b3b] hover:bg-red-700 text-white text-xs font-bold py-3.5 rounded-full transition-colors shadow-sm cursor-pointer"
                >
                  Evet
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
