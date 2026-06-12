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

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#874c66] uppercase block mb-1">
            {flower.category}
          </span>
          <h3 className="font-serif text-lg font-medium text-[#201a1a] mb-2 leading-snug group-hover:text-[#874c66] transition-colors">
            {flower.name}
          </h3>
          <p className="text-[#514348] text-xs line-clamp-2 leading-relaxed mb-4">
            {flower.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#ebe0df]/40 gap-2 mt-auto">
          <span className="text-base font-bold text-[#874c66] tracking-tight">
            {flower.price.toLocaleString("tr-TR")} ₺
          </span>
          
          <button 
            onClick={() => onAddToCart(flower)}
            className="flex items-center gap-1.5 bg-[#874c66] hover:bg-[#6f3b52] text-white font-sans text-xs font-semibold px-3 py-2 rounded-lg transition-transform duration-205 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus size={14} />
            Ekle
          </button>
        </div>
      </div>
    </motion.div>
  );
}
