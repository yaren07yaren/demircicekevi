/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlowerItem } from "../types";
import { Plus, Heart, Info } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  key?: string;
  flower: FlowerItem;
  onAddToCart: (flower: FlowerItem) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onShowDetails: (flower: FlowerItem) => void;
}

export default function ProductCard({
  flower,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  onShowDetails
}: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#ffffff] rounded-2xl overflow-hidden border border-[#ebe0df]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f7ebeb]">
        <img 
          src={flower.image} 
          alt={flower.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        


        {/* Favorite Icon */}
        <button 
          onClick={() => onToggleFavorite(flower.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#874c66] flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        >
          <Heart size={16} fill={isFavorite ? "#874c66" : "none"} strokeWidth={2} />
        </button>

        {/* Details Fast Button */}
        <button 
          onClick={() => onShowDetails(flower)}
          className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#514348] flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Detaylı Bilgi"
        >
          <Info size={16} />
        </button>
      </div>

      <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest text-[#874c66] uppercase block mb-0.5 sm:mb-1">
            {flower.category}
          </span>
          <h3 className="font-serif text-sm sm:text-lg font-medium text-[#201a1a] mb-1 sm:mb-2 leading-snug group-hover:text-[#874c66] transition-colors line-clamp-1 sm:line-clamp-none">
            {flower.name}
          </h3>
          <p className="text-[#514348] text-[11px] sm:text-xs line-clamp-2 leading-snug sm:leading-relaxed mb-3 sm:mb-4">
            {flower.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[#ebe0df]/40 gap-1.5 sm:gap-2 mt-auto">
          <span className="text-sm sm:text-base font-bold text-[#874c66] tracking-tight whitespace-nowrap">
            {flower.price.toLocaleString("tr-TR")} ₺
          </span>
          
          <button 
            onClick={() => onAddToCart(flower)}
            className="flex items-center justify-center gap-1 bg-[#874c66] hover:bg-[#6f3b52] text-white font-sans text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-transform duration-205 hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
          >
            <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>Ekle</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
