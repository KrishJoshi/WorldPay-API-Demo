import React from 'react';
import { shallow } from 'enzyme';
import OrderHeader from './';
import status from '../../api/status.enums'

describe('Order Header', () => {
let component;
  beforeEach(() => {
    component = shallow(<OrderHeader status={status.loading} />);
  });
  
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  
  it('should render authorised', () => {
    component.setProps({status: status.authorised});
    expect(component).toMatchSnapshot();
  });
  
  it('should render payed', () => {
    component.setProps({status: status.payed});
    expect(component).toMatchSnapshot();
    expect(component.find('h3').text()).toEqual("Order Complete")
  });
  
  it('should render refunded', () => {
    component.setProps({status: status.refunded});
    expect(component).toMatchSnapshot();
    expect(component.find('h3').text()).toBe("Refund Successful")
  });
  
  it('should render canceled', () => {
    component.setProps({status: status.canceled});
    expect(component).toMatchSnapshot();
    expect(component.find('h3').text()).toBe("Order Canceled")
  });
});




