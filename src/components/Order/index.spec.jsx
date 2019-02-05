import React from 'react';
import {shallow} from 'enzyme';
import Order from '.';
import status from '../../api/status.enums';
import OrderItems from '../OrderItems';
import Details from '../Details';
import mockOrder from '../../api/mocks/mockOrder'

let component;
beforeEach(() => {
  component = shallow(<Order orderDetails={mockOrder.instruction.paymentInstrument} status={status.loading}><></></Order>);
});

describe('Order', () => {
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  });
  
  describe('show order', () => {
    function orderShouldExist() {
      expect(component.find(OrderItems)).toHaveLength(1);
      expect(component.find(Details)).toHaveLength(1)
    }
    
    it('should show order details when order is in process', () => {
      component.setProps({ status: status.inProcess });
      orderShouldExist()
    });
    
    it('should show order details when order is authorised', () => {
      component.setProps({ status: status.authorised });
      orderShouldExist();
    });
    
    it('should show order details when order is loading', () => {
      component.setProps({ status: status.loading });
      orderShouldExist()
    });
  });
  
  
  describe('show hide order', () => {
    function orderShouldNotExist() {
      expect(component.find(OrderItems)).toHaveLength(0);
      expect(component.find(Details)).toHaveLength(0)
    }
    
    it('should not show order details when order is canceled', () => {
      component.setProps({ status: status.canceled });
      orderShouldNotExist();
    });
    
    it('should not show order details when order is refunded', () => {
      component.setProps({ status: status.refunded });
      orderShouldNotExist();
    });
    
    it('should not show order details when order is payed', () => {
      component.setProps({ status: status.payed });
      orderShouldNotExist();
    });
  })
});
