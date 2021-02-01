import {Product} from '@knawat/types'
declare module knawat_suppliers {
    class Products {
        constructor(key: string, secret: string)
        getProducts():Product[];
        addProducts(products: Product[]): {count: number, products: Product[], warning: string}
    }
}