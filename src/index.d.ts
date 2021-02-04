declare module '@knawat/suppliers' {
  // import {KnawatProduct} from '@knawat/types/sapp';

  class Products {
    constructor(args: {key: string; secret: string} | {token: string});
    getProducts(): {products: KnawatProduct[]; errors: Error[]};
    addProducts(
      products: KnawatProduct[]
    ): Promise<{
      count: number;
      products: KnawatProduct[];
      warning: string;
      errors: Error[];
    }>;

    updateBulkProduct(
      products: KnawatProduct[]
    ): Promise<{
      requestCount: number;
      updatedCount: number;
      errors: Error[];
    }>;

    updateProductBySku(
      sku: string,
      product: KnawatProduct
    ): Promise<{product: KnawatProduct; errors: Error[]}>;
  }
}
interface Error {
  message: string;
}

export interface KnawatProduct {
  sku: string;
  barcode: string;
  url: string;
  name: MultiLingual;
  description: MultiLingual;
  description_short?: MultiLingual;
  brand: MultiLingual;
  warehouse_id?: string;
  images: string[];
  categories?: number[];
  attributes: Array<{
    name: MultiLingual;
    options: MultiLingual[];
  }>;
  variations: Variation[];
}

interface Variation {
  sku: string;
  barcode: string;
  vat?: number;
  sale_price: number;
  market_price?: number;
  quantity: number;
  weight?: number;
  attributes: Array<{
    name: MultiLingual;
    option: MultiLingual;
  }>;
}

interface MultiLingual {
  en?: string;
  tr?: string;
  ar?: string;
}
