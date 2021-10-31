import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from './../context/AppContext';
import {handleSumTotal} from './../utils/index.js';
import './../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;
  const handleRemoveFromCart = (product) => () => {
    removeFromCart(product);
  };
  
  return (
    <>
      <div className="Checkout">
        <div className="Checkout-content">
          {cart.length > 0 ? (
            <h3>Lista de pedidos:</h3>
          ) : (
            <h3>No hay pedidos</h3>
          )}
          {cart.map((item) => {
            return (
              <div className="Checkout-item">
                <div className="Checkout-element">
                  <h4>{item.title}</h4>
                  <span>$ {item.price}</span>
                </div>
                <button type="button" onClick={handleRemoveFromCart(item)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="Checkout-sidebar">
            <h3>{`Precio Total: $ ${handleSumTotal(cart)}`}</h3>
            <Link to="/checkout/Information">
              <button type="button">Continuar pedido</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
