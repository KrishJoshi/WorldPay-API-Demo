import React from 'react';
import {mount} from 'enzyme';
import PaymentActions from '.';
import status from '../../api/status.enums'

describe('PaymentActions', () => {
  let component, onAuthorise = jest.fn(), onCancel = jest.fn(), onPay = jest.fn(),
    onRefund = jest.fn();
  beforeEach(() => {
    component = mount(<PaymentActions onAuthorise={onAuthorise}
                                      onCancel={onCancel}
                                      onPay={onPay}
                                      onRefund={onRefund}
                                      status={status.loading}/>);
  });
  
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
    expect(component.text()).toBe('Loading...')
  });
  
  it('show authorise button', () => {
    component.setProps({ status: status.inProcess });
    expect(component).toMatchSnapshot();
    expect(component.find('button').text()).toBe('Authorise');
  });
  
  it('should call authorise on click', () => {
    component.setProps({ status: status.inProcess });
    component.props().onAuthorise();
    expect(onAuthorise).toHaveBeenCalled();
  });
  
  it('when authorised: should call authorise on click', () => {
    component.setProps({ status: status.authorised });
    component.props().onPay();
    expect(onPay).toHaveBeenCalled();
  });
  
  it('when payed: should call refund on click', () => {
    component.setProps({ status: status.payed });
    component.props().onRefund();
    expect(onRefund).toHaveBeenCalled();
  });
});
