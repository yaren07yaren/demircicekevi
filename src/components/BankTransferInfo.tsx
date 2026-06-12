/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Copy, Check, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BankAccount {
  bankName: string;
  recipient: string;
  iban: string;
  branch: string;
}

const CONST_BANKS: BankAccount[] = [
  {
    bankName: "Akbank",
    recipient: "DEMİR ÇİÇEK EVİ LTD. ŞTİ.",
    iban: "TR27 0004 6000 1201 1234 5678 90",
    branch: "Gaziantep Merkez Şube (Kod: 101)"
  },
  {
    bankName: "T.C. Ziraat Bankası",
    recipient: "DEMİR ÇİÇEK EVİ LTD. ŞTİ.",
    iban: "TR54 0001 0002 0304 1234 5678 99",
    branch: "Gaziantep Şehitkamil Şubesi (Kod: 820)"
  },
  {
    bankName: "Türkiye İş Bankası",
    recipient: "DEMİR ÇİÇEK EVİ LTD. ŞTİ.",
    iban: "TR10 0006 2000 7821 1234 5678 11",
    branch: "Gaziantep Sanayi Şubesi (Kod: 450)"
  }
];

export default function BankTransferInfo() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (iban: string, bankName: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(bankName);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[#fdf1f0] border border-[#ebe0df]/80 rounded-xl text-xs text-[#514348]/90 leading-relaxed">
        <p className="font-semibold text-[#874c66] mb-1">Havale / EFT ile Ödeme Talimatı:</p>
        Aşağıdaki banka hesaplarından birine sipariş toplamını gönderdikten sonra siparişiniz hazırlanmaya başlanacaktır. 
        Açıklama alanına lütfen <strong>"Çiçek Siparişi - Adınız Soyadınız"</strong> yazmayı unutmayınız.
      </div>

      <div className="space-y-3">
        {CONST_BANKS.map((bank) => (
          <div 
            key={bank.bankName}
            className="p-4 bg-white rounded-xl border border-[#ebe0df]/55 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#874c66]/40 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-[#874c66]" />
                <span className="font-bold text-sm text-[#201a1a]">{bank.bankName}</span>
                <span className="text-[10px] text-[#514348]/70 font-medium">({bank.branch})</span>
              </div>
              <div className="text-xs text-[#514348]">
                Alıcı: <span className="font-semibold text-[#201a1a]">{bank.recipient}</span>
              </div>
              <div className="font-mono text-xs text-[#874c66] bg-[#fff8f7] px-2 py-1 rounded border border-[#ebe0df]/20 break-all select-all">
                {bank.iban}
              </div>
            </div>

            <button
              onClick={() => handleCopy(bank.iban, bank.bankName)}
              className="self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#f7ebeb] hover:bg-[#874c66] text-[#874c66] hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95"
            >
              <AnimatePresence mode="wait">
                {copiedId === bank.bankName ? (
                  <motion.span 
                    key="checked"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5 text-green-700 bg-green-50 sm:bg-transparent rounded px-1.5 sm:p-0"
                  >
                    <Check size={13} className="text-green-600" />
                    Kopyalandı!
                  </motion.span>
                ) : (
                  <motion.span 
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy size={13} />
                    Kopyala
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
