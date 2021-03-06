import { I18nString } from '@knawat/types';

export class Products {
  constructor(args: { key: string; secret: string } | { token: string });
  getProducts(): { products: KnawatProduct[]; errors: ResMessage[] };
  addProducts(
    products: KnawatProduct[]
  ): Promise<{
    count: number;
    products: KnawatProduct[];
    warning: string;
    errors: ResMessage[];
  }>;

  $fetch(...args: any): Promise<any | { errors: ResMessage[] }>;
  updateBulkProduct(
    products: KnawatProduct[]
  ): Promise<{
    requestCount: number;
    updatedCount: number;
    errors: ResMessage[];
  }>;

  updateProductBySku(
    sku: string,
    product: KnawatProduct
  ): Promise<{ product: KnawatProduct; errors: ResMessage[] }>;
}

interface ResMessage {
  message: string;
}

export interface KnawatProduct {
  sku: string;
  barcode?: string;
  url: string;
  name: Partial<I18nString>;
  description: Partial<I18nString>;
  description_short?: Partial<I18nString>;
  brand: Partial<I18nString>;
  warehouse_id?: string;
  images: string[];
  categories?: number[];
  attributes: Array<{
    name: Partial<I18nString>;
    options: Partial<I18nString>[];
  }>;
  variations: Variation[];
}

interface Variation {
  sku: string;
  barcode?: string;
  vat?: number;
  sale_price: number;
  market_price?: number;
  quantity: number;
  weight?: number;
  attributes: Array<{
    name: Partial<I18nString>;
    option: Partial<I18nString>;
  }>;
}
