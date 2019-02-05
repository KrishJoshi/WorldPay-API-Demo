import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import status from '../../api/status.enums.json';
import "./styles.css";

class PaymentActions extends PureComponent {
  render() {
    return (
      <>
        {this.props.status === status.loading && <div>Loading...</div>}
        {this.props.status === status.inProcess && <button className="btn" onClick={this.props.onAuthorise}>Authorise</button>}
        {this.props.status === status.authorised && <div><button className="btn" onClick={this.props.onPay}>Finalise Payment</button>
          <button className="btn" onClick={this.props.onCancel}>Cancel Payment</button></div>}
        {this.props.status === status.payed && <button className="btn" onClick={this.props.onRefund}>Refund</button>}
      </>
    );
  }
}

PaymentActions.propTypes = {
  status: PropTypes.number.isRequired,
  onAuthorise: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  onRefund: PropTypes.func.isRequired,
};

export default PaymentActions;
