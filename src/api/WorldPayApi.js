import config from '../config'
import axios from 'axios';

class WorldPayApi {
  constructor() {
    this.api = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: config.authKey,
        "Content-Type": 'application/vnd.worldpay.payments-v0.4+json',
        Accept: 'application/vnd.worldpay.payments-v0.4+json'
      }
    });
    this.links = {};
  }
  
  async getRootResource() {
    const { data } = await this.api.get('');
    this.links = data._links;
  }
  
  async authorise(order) {
    const { data } = await this.api.post(this.links['payments:authorize'].href, order);
    this.links = {
      ...this.links, ...data
    };
    return data;
  }
  
  async pay() {
    const settleUrl = this.links['payments:settle'];
    if(settleUrl) {
      const {data} = await this.api.post(settleUrl);
      this.links = {
        ...this.links, ...data
      };
      return data
    }
    else
      return new Error('Cannot settle before Authorising payment');
  }
  
  async refund() {
    const refundUrl = this.links['payments:refund'];
    if(refundUrl)
      return await this.api.post(refundUrl);
    else
      return new Error('Cannot refund before payment is settled');
  }
  
  async cancel() {
    const cancelUrl = this.links['payments:cancel'];
    if(cancelUrl)
      return await this.api.post(cancelUrl);
    else
      return new Error('Cannot cancel before Authorising payment');
  }
}
export default WorldPayApi;
