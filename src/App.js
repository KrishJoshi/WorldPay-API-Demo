import React, {Component} from 'react';
import WorldPayApi from './api/WorldPayApi';
import Order from './components/Order';
import PaymentActions from './components/PaymentActions';
import mockOrder from './api/mocks/mockOrder'
import status from './api/status.enums';
import './App.css';

class App extends Component {
  state = {
    status: status.loading,
  };
  
  constructor() {
    super();
    this.state.paymentRef = +new Date();
    this.worldPayApi = new WorldPayApi();
    
    this.onAuthorise = this.onAuthorise.bind(this);
    this.onPay = this.onPay.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRefund = this.onRefund.bind(this);
  }
  
  async componentDidMount() {
    await this.worldPayApi.getRootResource();
    this.setState({ status: status.inProcess });
  }
  
  async onAuthorise() {
    mockOrder.transactionReference = new Date().getTime();
    await this.worldPayApi.authorise(mockOrder);
    this.setState({ status: status.authorised });
  }
  
  async onPay() {
    await this.worldPayApi.pay();
    this.setState({ status: status.payed });
  }
  
  async onCancel() {
    await this.worldPayApi.cancel();
    this.setState({ status: status.canceled });
  }
  
  async onRefund() {
    await this.worldPayApi.refund();
    this.setState({ status: status.refunded });
  }
  
  render() {
    return (
      <Order status={this.state.status}
             orderDetails={mockOrder.instruction.paymentInstrument}>
        <PaymentActions onAuthorise={this.onAuthorise}
                        onCancel={this.onCancel}
                        onPay={this.onPay}
                        onRefund={this.onRefund}
                        status={this.state.status}/>
      </Order>
    );
  }
}

export default App;
