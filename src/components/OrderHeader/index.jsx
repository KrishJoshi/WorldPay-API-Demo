import React, {Component} from 'react';
import PropTypes from 'prop-types';
import status from '../../api/status.enums';
import './styles.css';

class OrderHeader extends Component {
  render() {
    let title = <h1>Complete Order</h1>;
    if (this.props.status === status.payed) {
      title = <>
        <h1 className="text-center"><span aria-label="success" role="img">✅</span>️</h1>
        <h3>Order Complete</h3></>
    } else if (this.props.status === status.refunded) {
      title = <>
        <h1 className="text-center"><span aria-label="success" role="img">✅</span>️</h1>
        <h3>Refund Successful</h3></>
    } else if (this.props.status === status.canceled) {
      title = <>
        <h1 className="text-center"><span aria-label="error" role="img">❌</span>️</h1>
        <h3>Order Canceled</h3></>
    }
    
    return <header className="App-header">
      {title}
    </header>
  }
}

OrderHeader.propTypes = {
  status: PropTypes.number.isRequired,
};

export default OrderHeader;
