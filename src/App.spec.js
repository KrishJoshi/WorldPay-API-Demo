import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import WorldPayApi from './api/WorldPayApi';
import status from './api/status.enums';
jest.mock('./api/WorldPayApi');

describe('App', () => {

  let component;
  beforeEach(async () => {
    WorldPayApi.mockClear();
    component = await shallow(<App/>);
  });
  
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  });
  
  it('should call worldpay api root on load', () => {
    expect(component.instance().worldPayApi.getRootResource).toHaveBeenCalled();
  });
  
  describe('Authorize', () => {
    beforeEach(async () => {
      await component.instance().onAuthorise();
    });
  
    it('should call worldpay api on authorize with a order, with a transaction id', async () => {
      expect(component.instance().worldPayApi.authorise).toHaveBeenCalledWith({
        'instruction': {
          'description': 'book',
          'paymentInstrument': {
            'billingAddress': {
              'address1': ' 270-289 Milton Rd',
              'address2': 'Milton',
              'countryCode': 'GB',
              'postalCode': 'CB4 0WE',
              'state': 'CAMBS',
            },
            'cardExpiryDate': {
              'month': 7,
              'year': 2099,
            },
            'cardHolderName': 'John Appleseed',
            'cardNumber': '4444333322221111',
            'cvc': '666',
            'type': 'card/plain',
          },
          'value': {
            'amount': 789,
            'currency': 'GBP',
          },
        },
        transactionReference: expect.any(Number),
      });
    });
  
  
    it('should set status after transaction to be authorized', async () => {
      return expect(component.state().status).toBe(status.authorised);
    });
  
  });
  
  describe('Pay', () => {
    beforeEach(async () => {
      await component.instance().onPay();
    });
    
    it('should call worldpay api when pay is called', () => {
      expect(component.instance().worldPayApi.pay).toHaveBeenCalled();
    });
    
    it('should set status after transaction to be payed', async () => {
      expect(component.state().status).toBe(status.payed);
    });
  });
  
  describe('Cancel', () => {
    beforeEach(async () => {
      await component.instance().onCancel();
    });
    
    it('should call worldpay api on cancel', () => {
      expect(component.instance().worldPayApi.cancel).toHaveBeenCalled();
    });
    
    it('should set status after transaction to be canceled ', () => {
      expect(component.state().status).toBe(status.canceled);
    });
  });
  
  describe('Refund', () => {
    beforeEach(async () => {
      await component.instance().onRefund();
    });
    
    it('should call worldpay api on refund', () => {
      expect(component.instance().worldPayApi.refund).toHaveBeenCalled();
    });
    
    it('should set status after transaction to be refunded ', () => {
      expect(component.state().status).toBe(status.refunded);
    });
  });
});
