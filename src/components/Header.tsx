/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToSection: (sectionId: string) => void;
  favoriteCount: number;
}

export default function Header({
  cartCount,
  onOpenCart,
  onNavigateToSection,
  favoriteCount
}: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fff8f7]/90 backdrop-blur-md border-b border-[#ebe0df]/40 shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-10 py-5 max-w-[1440px] mx-auto">
        <button 
          onClick={() => onNavigateToSection("hero")}
          className="text-left select-none group cursor-pointer"
        >
          <h1 className="font-serif text-2xl font-normal text-[#201a1a] tracking-tight group-hover:text-[#874c66] transition-colors leading-none">
            Demir Çiçek Evi
          </h1>
          <span className="text-[9px] tracking-[0.25em] text-[#874c66] mt-1 block font-semibold uppercase leading-none opacity-90">
            GAZİANTEP
          </span>
        </button>

        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => onNavigateToSection("hero")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            Ana Sayfa
          </button>
          <button 
            onClick={() => onNavigateToSection("buketler")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            Buketler
          </button>
          <button 
            onClick={() => onNavigateToSection("hediyelikler")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            Hediyelik Ürünler
          </button>
          <button 
            onClick={() => onNavigateToSection("buketler")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            Galeri
          </button>
          <button 
            onClick={() => onNavigateToSection("hakkimizda")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            Hakkımızda
          </button>
          <button 
            onClick={() => onNavigateToSection("iletisim")}
            className="font-medium text-xs tracking-wider uppercase text-[#514348] hover:text-[#874c66] transition-colors duration-300 cursor-pointer"
          >
            İletişim
          </button>
        </div>

        <div className="flex items-center space-x-5">
          <button 
            onClick={() => onNavigateToSection("buketler")}
            className="hover:scale-110 p-2 text-[#874c66] hover:bg-[#f7ebeb] rounded-full transition-all duration-205 cursor-pointer relative group"
            title="Arama Yap"
          >
            <Search size={20} strokeWidth={1.75} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#201a1a] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Arama
            </span>
          </button>

          <button 
            onClick={() => onNavigateToSection("buketler")}
            className="hover:scale-110 p-2 text-[#874c66] hover:bg-[#f7ebeb] rounded-full transition-all duration-205 cursor-pointer relative group"
            title="Favorilerim"
          >
            <Heart size={20} strokeWidth={1.75} />
            {favoriteCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
              >
                {favoriteCount}
              </motion.span>
            )}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#201a1a] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Favorilerim
            </span>
          </button>

          <button 
            onClick={onOpenCart}
            className="hover:scale-110 p-2 text-[#874c66] hover:bg-[#f7ebeb] rounded-full transition-all duration-205 cursor-pointer relative group"
            title="Alışveriş Sepeti"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            <motion.span 
              key={cartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 bg-[#874c66] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
            >
              {cartCount}
            </motion.span>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#201a1a] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Sepetim
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
