import axios from 'axios';
import WorldPayApi from './WorldPayApi';
import config from '../config';
import rootData from '../../server/data/root.json';
import authData from '../../server/data/authorizations.json';
import settleData from '../../server/data/settle.json';
import orderData from './mocks/mockOrder.json';
jest.mock('axios');


describe('WorldPayApi', () => {
  let worldPayApi;
  beforeEach(() => {
    axios.mockClear();
    axios.create.mockImplementation(() => ({get: jest.fn(), post: jest.fn()}));
    worldPayApi = new WorldPayApi();
  });
  
  it('should configure correct headers', async () => {
    expect(axios.create).toHaveBeenCalledWith({
        'baseURL': config.baseUrl,
        'headers': {
          'Accept': 'application/vnd.worldpay.payments-v0.4+json',
          'Authorization': config.authKey,
          'Content-Type': 'application/vnd.worldpay.payments-v0.4+json',
        },
      },
    );
  });
  
  it('should assign links when root resource ', async () => {
    worldPayApi.api.get.mockImplementation(() => Promise.resolve({ data: rootData }));
    await worldPayApi.getRootResource();
    expect(worldPayApi.links).toBe(rootData._links);
  });
  
  it('should be able to authorise payment and assign settling url', async () => {
    worldPayApi.api.post.mockImplementation(() => Promise.resolve({ data: authData }));
    worldPayApi.links = rootData._links;
  
    await worldPayApi.authorise(orderData);
    expect(worldPayApi.links).toEqual({...rootData._links, ...authData});
    expect(worldPayApi.api.post).toHaveBeenCalledWith(rootData._links['payments:authorize'].href, orderData);
  });
  
  it('should be able to settle payment', async () => {
    worldPayApi.api.post.mockImplementation(() => Promise.resolve({ data: settleData}));
    worldPayApi.links = authData._links;
    
    await worldPayApi.pay();
    expect(worldPayApi.api.post).toHaveBeenCalledWith(authData._links['payments:settle']);
  });
  
  it('should be able to cancel payment', async () => {
    worldPayApi.api.post.mockImplementation(() => Promise.resolve({}));
    worldPayApi.links = authData._links;
  
    await worldPayApi.cancel();
    expect(worldPayApi.api.post).toHaveBeenCalledWith(authData._links['payments:cancel']);
  });
  
  it('should be able to refund payment', async () => {
    worldPayApi.api.post.mockImplementation(() => Promise.resolve({}));
    worldPayApi.links = settleData._links;
  
    await worldPayApi.refund();
    expect(worldPayApi.api.post).toHaveBeenCalledWith(settleData._links['payments:refund']);
  });
  
  it('should error settling payment, when no link is provided', async () => {
    const pay = await worldPayApi.pay();
    expect(pay.message).toBe('Cannot settle before Authorising payment');
  });
  
  it('should error refund payment, when no link is provided', async () => {
    const pay = await worldPayApi.refund();
    expect(pay.message).toBe('Cannot refund before payment is settled');
  });
  
  it('should error cancel payment, when no link is provided', async () => {
    const pay = await worldPayApi.cancel();
    expect(pay.message).toBe('Cannot cancel before Authorising payment');
  });
})
