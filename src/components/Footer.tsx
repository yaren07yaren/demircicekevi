/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Instagram, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="bg-white w-full py-16 border-t border-[#ebe0df]/90 font-sans text-left">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-10 max-w-[1440px] mx-auto text-[#201a1a]">
        
        {/* Column 1: Brand details */}
        <div className="space-y-4">
          <div>
            <span className="font-serif text-3xl font-normal text-[#201a1a] tracking-tight block">
              Demir Çiçek Evi
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#874c66] mt-1.5 uppercase block font-semibold leading-none">
              GAZİANTEP
            </span>
          </div>
          <p className="text-[#514348]/80 text-sm leading-relaxed max-w-xs font-sans">
            Zarif, el yapımı yapay ve ipek buketler. En özel günlerinizde solmayan zarafet.
          </p>
        </div>

        {/* Column 2: Menü Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-2xl font-normal text-[#201a1a] tracking-tight">
            Menü
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[#514348]/90">
            <li>
              <a href="#hero" className="hover:text-[#874c66] transition-colors">
                Ana Sayfa
              </a>
            </li>
            <li>
              <a href="#buketler" className="hover:text-[#874c66] transition-colors">
                Tüm Buketler
              </a>
            </li>
            <li>
              <a href="#galeri" className="hover:text-[#874c66] transition-colors">
                Galeri
              </a>
            </li>
            <li>
              <a href="#hakkimizda" className="hover:text-[#874c66] transition-colors">
                Hakkımızda
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: İletişim */}
        <div className="space-y-4">
          <h4 className="font-serif text-2xl font-normal text-[#201a1a] tracking-tight">
            İletişim
          </h4>
          <ul className="space-y-4 font-sans text-sm text-[#514348]/95">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-[#874c66]/70 shrink-0" />
              <span>Gaziantep İçi Elden Teslimat</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#874c66]/70 shrink-0" />
              <span>0505 158 05 64</span>
            </li>
            <li className="pt-1">
              <a 
                href="https://wa.me/905051580564" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.874-1.874-4.36-2.903-7.002-2.904-5.439 0-9.863 4.414-9.866 9.865-.001 2.016.528 3.99 1.533 5.725l-.946 3.456 3.548-.93zm11.362-5.043c-.366-.183-2.161-1.067-2.5-1.19-.338-.124-.585-.183-.831.183-.246.367-.954 1.19-1.169 1.438-.215.247-.43.274-.796.091-.366-.183-1.547-.571-2.947-1.819-1.09-.971-1.826-2.17-2.04-2.536-.215-.366-.023-.564.16-.745.164-.163.366-.427.549-.64.183-.213.244-.366.366-.61.122-.244.061-.458-.031-.64-.092-.183-.831-2.003-1.139-2.743-.3-.722-.605-.623-.831-.635-.215-.011-.462-.013-.708-.013-.246 0-.646.092-.985.462-.338.367-1.293 1.267-1.293 3.09 0 1.823 1.323 3.581 1.507 3.826.184.245 2.604 3.976 6.307 5.572.88.38 1.567.607 2.103.777.886.28 1.691.24 2.327.145.71-.106 2.161-.882 2.467-1.737.307-.852.307-1.583.215-1.737-.092-.153-.338-.244-.704-.427z"/>
                </svg>
                <span>WhatsApp ile Ulaşın</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Instagram */}
        <div className="space-y-4">
          <h4 className="font-serif text-2xl font-normal text-[#201a1a] tracking-tight">
            Instagram
          </h4>
          <ul className="space-y-4 font-sans text-sm text-[#514348]/90">
            <li>
              <a 
                href="https://instagram.com/demirorganizasyon27" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 hover:text-[#874c66] transition-colors"
              >
                <Instagram size={18} className="text-[#874c66]/70 shrink-0" />
                <span>@demirorganizasyon27</span>
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com/gazianteporganizasyondemir" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 hover:text-[#874c66] transition-colors"
              >
                <Instagram size={18} className="text-[#874c66]/70 shrink-0" />
                <span>@gazianteporganizasyondemir</span>
              </a>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Footer Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mt-16 pt-8 border-t border-[#ebe0df]/70 flex flex-col sm:flex-row justify-between items-center text-xs text-[#514348]/75 gap-4">
        <span>© 2026 Demir Çiçek Evi. Tüm hakları saklıdır.</span>
        <button 
          onClick={onAdminClick}
          className="hover:text-[#874c66] transition-colors font-sans cursor-pointer"
        >
          Yönetici Girişi
        </button>
      </div>
    </footer>
  );
}
