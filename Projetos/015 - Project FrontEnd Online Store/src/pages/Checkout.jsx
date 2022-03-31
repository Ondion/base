import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  render() {
    const { cart } = this.props;
    const total = cart.reduce((prev,
      { price },
      index,
      cartArray) => prev + price * cartArray[index].quantity, 0);
    return (
      <div>
        <h1>Checkout:</h1>
        {cart.map(({ id, price, title, thumbnail, quantity }) => (
          <div key={ id }>
            <p>{`Código: ${id}`}</p>
            <p>{`Preço: ${price}`}</p>
            <p>{`Titulo: ${title}`}</p>
            <img src={ thumbnail } alt={ `Produto: ${title}` } />
            <p>{`Quantidade: ${quantity}`}</p>
            <br />
          </div>
        ))}
        <h2>{`TOTAL: ${total}`}</h2>
        <br />
        <div>
          <form action="">
            <label htmlFor="checkout-fullname">
              <input
                data-testid="checkout-fullname"
                type="text"
                placeholder="Nome completo"
                name="checkout-fullname"
                id="checkout-fullname"
              />
            </label>
            <label htmlFor="checkout-email">
              <input
                data-testid="checkout-email"
                type="email"
                placeholder="Email"
                name="checkout-email"
                id="checkout-email"
              />
            </label>
            <label htmlFor="checkout-cpf">
              <input
                data-testid="checkout-cpf"
                type="text"
                placeholder="CPF"
                name="checkout-cpf"
                id="checkout-cpf"
              />
            </label>
            <label htmlFor="checkout-phone">
              <input
                data-testid="checkout-phone"
                type="text"
                placeholder="Telefone"
                name="checkout-phone"
                id="checkout-phone"
              />
            </label>
            <label htmlFor="checkout-cep">
              <input
                data-testid="checkout-cep"
                type="text"
                placeholder="CEP"
                name="checkout-cep"
                id="checkout-cep"
              />
            </label>
            <label htmlFor="checkout-address">
              <input
                data-testid="checkout-address"
                type="text"
                placeholder="Endereço"
                name="checkout-address"
                id="checkout-address"
              />
            </label>
            <button
              id="button-buy"
              name="button-buy"
              type="button"
              onClick={ () => alert(
                atob('RXh0cmEhISEgRXh0cmEhISEgMTMgdHJveGFzIGVuZ2FuYWRvcyEhIQ=='),
              ) }
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf.isRequired,
};

export default Checkout;
