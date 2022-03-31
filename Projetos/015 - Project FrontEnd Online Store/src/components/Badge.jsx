import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Badge extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div data-testid="shopping-cart-size">
        {cart && (cart.reduce((prev,
          { quantity }) => prev + quantity, 0))}
      </div>
    );
  }
}

Badge.propTypes = {
  cart: PropTypes.objectOf.isRequired,
};

export default Badge;
