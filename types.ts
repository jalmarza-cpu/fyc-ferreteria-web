
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  priceRetail: number;
  priceWholesale: number;
  imageUrl: string;
  category: string;
  isLarge?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
