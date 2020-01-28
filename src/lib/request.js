import fetch from 'node-fetch';
import querystring from 'querystring';
import config from './config';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class Request
 */
class Request {
  static baseUrl = config.SUPPLIERS_API_URL;
  headers = config.HEADERS;

  constructor() {
    this.user = config.BASIC_USER;
    this.pass = config.BASIC_PASS;
  }

  setAuthHeaders(auth) {
    if (auth === 'Basic') {
      const AUTH = Buffer.from(`${this.user}:${this.pass}`).toString('base64');
      this.headers.authorization = `Basic ${AUTH}`;
      return;
    }
    if (auth === 'Bearer') {
      const supplierToken = await this.getTokenAuth();
      this.headers.authorization = `Bearer ${supplierToken}`;
      return;
    }
    if (!auth === auth === 'none') {
      delete this.headers.authorization;
    }
  }

  /**
   * Generate access token from store key and secret
   *
   * @readonly
   * @memberof Products
   */
  getTokenAuth() {
    if (!this.token) {
      return this.refreshToken();
    }
    return this.token;
  }

  /**
   * Generates a new access token
   *
   * @returns
   * @memberof Products
   */
  refreshToken() {
    return this.$fetch('POST', '/token', {
      auth: 'none',
      body: JSON.stringify({
        key: this.consumerKey,
        secret: this.consumerSecret,
      }),
    }).then(({ user }) => {
      this.token = user.token;
      return user.token;
    });
  }

  /**
   * Fetch data from server
   *
   * @param {string} method
   * @param {string} path
   * @param {object} options
   */
  async $fetch(method, path, options = {}) {
    this.setAuthHeaders(options.auth || this.authentication);
    let url = `${Request.baseUrl}${path}`;
    if (options.queryParams){
      url = `${url}?${this.getUrlParams(options)}`;
      delete queryParams;
    }

    let fetchOptions = {
      method,
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };
    return fetch(url, fetchOptions)
      .then(res => res.json())
      .catch(error => { throw error });
  }

  
  getUrlParams(options) {
    // clean empty params
    Object.entries(options).forEach(o => o[1] === null ? delete options[o[0]] : 0);

    let nestedParams = "";
    const optionKeys = Object.keys(options);
    optionKeys.forEach(k => {
      if(typeof options[k] === 'object'){
        const subKeys = Object.keys(options[k]);
        subKeys.forEach(sk => {
          nestedParams = `${nestedParams}&${k}[${sk}]=${options[k][sk]}`;
        })
        delete options[k]
      }
    })

    const params = querystring.stringify(options);
    const paramString = `${params}${nestedParams}`;
    return paramString;
  }
}

module.exports = Request;
