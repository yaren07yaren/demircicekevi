/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FlowerItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details: string;
  type?: "bouquet" | "gift";
  inStock?: boolean;
  isFeatured?: boolean;
  subCategory?: string;
}

export interface CartItem {
  flower: FlowerItem;
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  date: string;
  timeSlot: string;
  note: string;
}

export type PaymentMethod = "credit_card" | "transfer" | "cod";

export interface CreditCardInfo {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}



