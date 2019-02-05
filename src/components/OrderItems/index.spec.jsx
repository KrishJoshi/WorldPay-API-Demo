import React from 'react';
import {shallow} from 'enzyme';
import OrderItems from '.';

let component;
beforeEach(() => {
  component = shallow(<OrderItems/>);
});

describe('OrderItems', () => {
  
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  });
  
});
