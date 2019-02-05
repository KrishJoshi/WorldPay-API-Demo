import React, {Component} from 'react';
import './styles.css';
import Details from '../Details';
import status from '../../api/status.enums';
import OrderItems from '../OrderItems';
import PropTypes from 'prop-types';
import OrderHeader from '../OrderHeader';

class Order extends Component {
  static showOrderDetails(orderStatus) {
    return (orderStatus !== status.canceled) &&
      (orderStatus !== status.refunded) &&
      (orderStatus !== status.payed)
  }
  
  render() {
    return (
      <div className="container">
        <OrderHeader status={this.props.status}/>
        {Order.showOrderDetails(this.props.status) && <>
          <OrderItems/>
          <Details card={this.props.orderDetails}/>
        </>}
        {this.props.children}
      </div>
    );
  }
}

Order.propTypes = {
  status: PropTypes.number.isRequired,
  orderDetails: Details.propTypes.card,
  children: PropTypes.element.isRequired,
};

export default Order;
