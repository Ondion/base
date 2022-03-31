import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { cart, handleCart } = this.props;
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (cart.map((c) => (
            <div key={ c.id }>
              <img src={ c.thumbnail } alt={ c.name } />
              <p data-testid="shopping-cart-product-name">
                {`${c.title} `}
                <button
                  name="product-delete"
                  type="button"
                  onClick={ (e) => handleCart(e, c.id) }
                >
                  x
                </button>
              </p>
              <p data-testid="shopping-cart-product-quantity">
                {`Quantidade: ${c.quantity}`}
              </p>
              <button
                name="product-increase-quantity"
                data-testid="product-increase-quantity"
                type="button"
                onClick={ (e) => handleCart(e, c.id) }
                disabled={ c.availableQuantity === c.quantity }
              >
                +
              </button>
              <button
                name="product-decrease-quantity"
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ (e) => handleCart(e, c.id) }
                disabled={ false }
              >
                -
              </button>
            </div>)))}
        <Link to="/checkout" data-testid="checkout-products">
          <button type="button">
            Checkout
          </button>
        </Link>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf.isRequired,
  handleCart: PropTypes.func.isRequired,
};

export default Cart;
