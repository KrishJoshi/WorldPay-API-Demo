import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Details extends PureComponent {
  render() {
    const {cardNumber,cardHolderName, cardExpiryDate} = this.props.card;
    return (
      <>
        <form className="pure-form pure-form-aligned">
          <div className="form-group">
            <label htmlFor="cardHolderName">Name</label>
            <input id="cardHolderName" type="text" placeholder="Card Holder Name" readOnly={true} value={cardHolderName}/>
          </div>
          <div className="form-group">
            <label htmlFor="cardNum">Card Number</label>
            <input id="cardNum" type="cardNum" placeholder="Card Number" readOnly={true} value={cardNumber}/>
          </div>
          <div className="form-group">
            <label htmlFor="expires">Expires</label>
            <input id="expires" type="number" placeholder="Month" readOnly={true} value={cardExpiryDate.month}/>
            <input id="expiresYear" type="number" placeholder="Year" readOnly={true} value={cardExpiryDate.year}/>
          </div>
        </form>
        <div className="divider"/>
      </>
    );
  }
}

export const propTypes = {
  card: PropTypes.shape({
    cardNumber: PropTypes.string.isRequired,
    cardHolderName: PropTypes.string.isRequired,
    cardExpiryDate: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number
    }).isRequired,
  }).isRequired
};


Details.propTypes = propTypes;

export default Details;
