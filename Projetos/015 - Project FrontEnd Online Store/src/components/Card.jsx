import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor() {
    super();

    this.state = {};
  }

  addToCart({ thumbnail, price, title, id, available_quantity: availableQuantity }) {
    const { addProductCart } = this.props;
    addProductCart({ thumbnail, price, title, id, availableQuantity });
  }

  render() {
    const {
      thumbnail,
      price,
      title,
      id,
      available_quantity: availableQuantity,
      shipping: { free_shipping: free },
    } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/productdetail/${id}` }>
          <p>{ title }</p>
          <img src={ thumbnail } alt="" width="100px" height="100px" />
        </Link>
        <p>{ `Preço: R$ ${price}` }</p>
        {free && <p data-testid="free-shipping">Frete Gratis!</p>}
        <p>{`Quantidade Disponível: ${availableQuantity}`}</p>
        <button
          onClick={ () => { this.addToCart(this.props); } }
          data-testid="product-add-to-cart"
          type="button"
        >
          Adicionar item ao carrinho
          <span role="img" aria-label="cart">🛒</span>
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  addProductCart: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  shipping: PropTypes.objectOf.isRequired,
  available_quantity: PropTypes.string.isRequired,
};

export default Card;
