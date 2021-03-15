import { Products } from '../../src';

Products.baseUrl = 'https://dev.mp.knawat.io/api';
const instance = {
  key: 'd6f54aa0-0e34-11eb-8d4e-c3a9e850ddfa',
  secret: 'c6cc034c-2dc6-43bf-806a-ad993a0cc96e',
  apiRateLimit: {
    bucketSize: 10,
    interval: 1000,
    limit: 2,
  },
};
const client = new Products(instance);
const spy = jest.spyOn(client, 'refreshToken');
/**
 * Test Knawat API limit
 */

const callsToTest = 30;
const bucketSize = 10;
const seconds = (callsToTest - bucketSize) / 2;
jest.setTimeout((callsToTest + 10) * 1000);
test(`Throttling ${callsToTest} requests in ${seconds}+ seconds`, async done => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const startDate = new Date();
  return Promise.all(
    [...Array(callsToTest).keys()].map(() => client.getProducts())
  ).then(() => {
    expect(spy).toHaveBeenCalledTimes(1);

    console.log(`Took ${(new Date() - startDate) / 1000} seconds`);
    expect((new Date() - startDate) / 1000).toBeGreaterThanOrEqual(seconds);
    done();
  });
});
