import React from 'react';
import {shallow} from 'enzyme';
import Details from '.';
import mockOrder from '../../api/mocks/mockOrder'

let component;
beforeEach(() => {
  component = shallow(<Details card={mockOrder.instruction.paymentInstrument}/>);
});

describe('Details', () => {
  
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  });
  
  it('should have all expected elements', () => {
    expect(component.find('#cardHolderName')).toHaveLength(1);
    expect(component.find('#cardNum')).toHaveLength(1);
    expect(component.find('#cardHolderName')).toHaveLength(1);
    expect(component.find('#cardHolderName')).toHaveLength(1);
  });
});
