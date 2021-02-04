import Request from './request';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class Products
 */
class Products extends Request {
  /**
   * Creates an instance of Products.
   *
   */
  constructor(...args) {
    super('Bearer', ...args);
  }

  /**
   * Get all imported products
   *
   * @param {object} {
   *     limit = 10
   *     page = 1,
   *     qualified = 1: Qualified, 2: Needs to review, 4: Disqualified, 5 : Draft,
   *     category_id = 1,57 / -1,
   *     keyword = "mavi",
   *     stock = { stock_from: 12, stock_to: 50},
   *     price = { price_from: 12, price_to: 50},
   *     sort_by = name/ stock/ qualified/ price/ stock,
   *     sort_asc = 1/-1,
   *     language = tr/ en/ ar
   *   }
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_list_of_products
   * @memberof Products
   */
  getProducts(queryParams = {}) {
    return this.$fetch('GET', '/catalog/products', { queryParams });
  }

  /**
   * Get product by sku
   *
   * @param {string} sku
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_product_by_sku
   * @memberof Products
   */
  getProductBySku(sku) {
    return this.$fetch('GET', `/catalog/products/${sku}`);
  }

  /**
   * Add product(s) to my list
   *
   * @param {array*} products
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_add_to_my_products
   * @memberof Products
   */
  addProducts(products) {
    return this.$fetch('POST', '/catalog/products', {
      body: JSON.stringify({
        products,
      }),
    });
  }

  /**
   * Update product external IDs by SKU
   *
   * @param {*} data
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_update_product
   * @memberof Products
   */
  updateProductBySku(sku, product) {
    return this.$fetch('PUT', `/catalog/products/${sku}`, {
      body: JSON.stringify({ product }),
    });
  }

  /**
   * Bulk product update
   *
   * @param {*} data
   * @returns
   * @see
   * @memberof Products
   */
  updateBulkProduct(products) {
    return this.$fetch('PUT', '/catalog/products', {
      body: JSON.stringify({
        products,
      }),
    });
  }
  /**
   * Delete Product
   *
   * @param {*} sku
   * @returns
   * @see
   */
  deleteProduct(sku) {
    return this.$fetch('DEL', `/catalog/products/${sku}`);
  }

  /**
   * Get all catalog categories
   *
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_list_of_categories
   * @memberof Products
   */
  getCategories({ parentId = null, level = null } = {}) {
    // get query paramaters
    let queryParams = {};
    if (parentId && parentId > 0) {
      queryParams.parentId = parentId;
    }
    if (level && level > 0) {
      queryParams.level = level;
    }
    return this.$fetch('GET', '/catalog/categories', { queryParams });
  }

  /**
   *  Get all current orders
   *
   * @param {object} {
   *     limit = 20
   *     page = 1,
   *     status = open/issued/cancelled/billed/closed/token,
   *     purchaseorderNumber = PO-xxxx1,
   *   }
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_order_s_
   * @memberof Products
   */
  getOrders({
    limit = 20,
    page = 1,
    status = null,
    purchaseorderNumber = null,
  }) {
    // Generate url query paramaters
    const queryParams = {
      limit,
      page,
      status,
      purchaseorderNumber,
    };
    return this.$fetch('GET', '/orders', { queryParams });
  }

  /**
   * Get order by id
   *
   * @param {string} id
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_order_by_id
   * @memberof Products
   */
  getOrderById(id) {
    return this.$fetch('GET', `/orders/${id}`);
  }

  /**
   * Cancel order by id
   *
   * @param {string} id
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_order_by_id
   * @memberof Products
   */
  cancelOrder(id) {
    return this.$fetch('DELETE', `/orders/${id}`);
  }

  /**
   * Create new order
   *
   * @param {array} data
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_create_order
   * @memberof Products
   */
  createOrder(data) {
    return this.$fetch('POST', '/orders', {
      body: JSON.stringify(data),
    });
  }

  /**
   * Update current order
   *
   * @param {string} orderId
   * @param {array} data
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_update_order
   * @memberof Products
   */
  updateOrder(orderId, data) {
    return this.$fetch('PUT', `/orders/${orderId}`, {
      body: JSON.stringify(data),
    });
  }
}

module.exports = Products;
