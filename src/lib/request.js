import fetch from 'node-fetch';
import qs from 'qs';
import config from './config';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class Request
 */
class Request {
  static baseUrl = config.SUPPLIERS_API_URL;
  headers = config.HEADERS;

  constructor(authType, credentials) {
    this.authentication = authType;

    // check for Bearer credentials
    if (authType === 'Bearer') {
      if (
        !credentials ||
        ((!credentials.key || !credentials.secret) && !credentials.token)
      ) {
        throw new Error('Not a valid consumerKey, consumerSecret, or token');
      }
      this.consumerKey = credentials.key;
      this.consumerSecret = credentials.secret;
      this.token = credentials.token;
    }

    // check for Basic credentials
    if (authType === 'Basic') {
      if (
        (!config.BASIC_USER || !config.BASIC_PASS) &&
        (!credentials.user || !credentials.pass)
      ) {
        throw new Error('No valid Username or Password');
      }
      this.user = config.BASIC_USER || credentials.user;
      this.pass = config.BASIC_PASS || credentials.pass;
    }
  }

  async setAuthHeaders(auth) {
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
    if (!auth || auth === 'none') {
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
    await this.setAuthHeaders(options.auth || this.authentication);
    let url = `${Request.baseUrl}${path}`;

    if (options.queryParams) {
      // clean empty values
      const sanitizedQuery = Object.entries(options.queryParams).reduce(
        (acc, [key, val]) => {
          // remove null and undefined values only
          if (val === null || val === undefined) {
            return;
          }
          acc[key] = val;
          return acc;
        },
        {}
      );

      url += `?${qs.stringify(sanitizedQuery)}`;
      delete options.queryParams;
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
      .catch(error => {
        throw error;
      });
  }
}

module.exports = Request;
