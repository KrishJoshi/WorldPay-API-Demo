import React, { Component} from 'react';
import './styles.css';

class OrderItems extends Component {
  render() {
    return (
        <React.Fragment>
          <ul className="order">
            <li className="order-item">Jeans - £20</li>
            <li className="order-item">Shirt - £50</li>
          </ul>
          <div className="divider"/>
        </React.Fragment>
    );
  }
}

export default OrderItems;
