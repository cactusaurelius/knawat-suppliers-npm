import request from './request';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class WeightRules
 */
class WeightRules extends request {
  /**
   * Creates an instance of WeightRules.
   *
   * @param {object} activeInstance
   * @memberof WeightRules
   */
  constructor() {
    super();
    this.authentication = 'Basic';
  }

  /**
   * Get all Weight rules
   *
   * @param {object} { limit = 20, page = 1, sort = null}
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_all_weight_rules
   * @memberof WeightRules
   */
  getWeightRules({
    limit = 20,
    page = null,
    sort = null
  } = {}) {
    // Generate url query paramaters
    let queryParams = {
      limit,
      page,
      sort
    };
    Object.entries(queryParams).forEach( o => (o[1] === null ? delete queryParams[o[0]] : 0));
    return this.$fetch('GET', `/weight_rules`, queryParams);
  }

  /**
   * Create weight rule
   *
   * @param {object}  weightRules  { "keyword" : "Shirt", "weight": 5 } 
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_create_a_supplier
   * @memberof WeightRules
   */
  createWeightRule(weightRules) {
    return this.$fetch('POST', `/weight_rules`, weightRules);
  }

  /**
   * Update weight rule by id
   *
   * @param {*} data
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_update_weight_rule
   * @memberof WeightRules
   */
  updateWeightRule(id, data) {
    return this.$fetch('PUT', `/weight_rules/${id}`, {
      body: JSON.stringify({ data })
    });
  }

  /**
   * Delete weight rule by id
   *
   * @param {*} data
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_delete_weight_rule
   * @memberof WeightRules
   */
  deleteWeightRule(id, data) {
    return this.$fetch('DELETE', `/weight_rules/${id}`);
  }

}

module.exports = WeightRules;
