import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from './../context/AppContext';
import {handleSumTotal} from './../utils/index';
import { useHistory } from 'react-router-dom';
import './../styles/components/Payment.css';

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();
  const paypalOptions = {
    clientId: 'AQQfhovXilpoHgerH7I0KINvumeLZMvzAvi11O32DKUP1_Wz1vFLJ4LIt6Q9W4abp7IS1LATxEm-PF6H',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };

      addNewOrder(newOrder);
      history.pushState('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => {
          return <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>;
        })}
        <div className="Payment-button">
          <PayPalButton
            options={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onSuccess={(data) => {
              handlePaymentSuccess(data)
            }}
            onError={(error)=> console.log(error)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payment;
