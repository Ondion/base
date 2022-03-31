import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetails } from '../services/api';
import Badge from '../components/Badge';

class ProductDetail extends Component {
  constructor() {
    super();

    this.handleApis = this.handleApis.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.chanceFunction = this.chanceFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);

    this.state = {
      loading: false,
      query: [],
      rate: 3,
      storage: [],
    };
  }

  componentDidMount() {
    this.handleApis();
    const { match: { params: { id } } } = this.props;
    const storage = JSON.parse(localStorage.getItem(id));
    if (storage) {
      this.setState({ storage });
    }
  }

  async handleApis() {
    this.setState(({ loading }) => ({ loading: !loading }));
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getDetails(id);
    this.setState(() => ({ query: response, id }));
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  addToCart({ thumbnail, price, title, id }) {
    const { addProductCart } = this.props;
    addProductCart({ thumbnail, price, title, id });
  }

  chanceFunction({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async submitFunction() {
    const { email, evaluation, rate } = await this.state;
    const storageObj = { email, rate, evaluation };
    this.setState(({ storage }) => ({ storage: [...storage, storageObj] }));
    const { storage, id } = this.state;
    localStorage.setItem(id, JSON.stringify(storage));
  }

  render() {
    const {
      email,
      evaluation,
      rate,
      loading,
      storage,
      query: { thumbnail, price, title, permalink, attributes, id },
    } = this.state;
    const { chanceFunction, submitFunction } = this;
    return (
      <div>
        {loading && <p>Carregando....</p>}
        <div>
          <Badge { ...this.props } />
          <Link to="/Cart" data-testid="shopping-cart-button">
            <button type="button">🛒</button>
          </Link>
        </div>
        <Link to="/checkout" data-testid="checkout-products">
          <button type="button">
            Checkout
          </button>
        </Link>
        <p>ProductDetail</p>
        <p data-testid="product-detail-name">{ title }</p>
        <a href={ permalink }>
          <img src={ thumbnail } alt="" width="400px" height="400px" />
        </a>
        <p>{ `Preço: R$ ${price}` }</p>
        { attributes
          && attributes.map(({ name, value_name: value }) => (
            <p key={ name + value }>{ `${name}: ${value}` }</p>
          )) }
        <div>
          <button
            onClick={ () => { this.addToCart({ thumbnail, price, title, id }); } }
            type="button"
            data-testid="product-detail-add-to-cart"
          >
            Adicionar item ao carrinho
            <span role="img" aria-label="cart">🛒</span>
          </button>
        </div>
        {storage.map((e) => (
          <>
            <p>{`${e.email}`}</p>
            <p>{`${e.rate}`}</p>
            <p>{`${e.evaluation}`}</p>

          </>
        ))}
        <input
          data-testid="product-detail-email"
          type="email"
          name="email"
          id="product-detail-email"
          placeholder="Email"
          onChange={ (event) => chanceFunction(event) }
          value={ email }
        />
        <input
          data-testid="1-rating"
          type="radio"
          name="rate"
          value="1"
          onChange={ (event) => chanceFunction(event) }
        />
        <input
          data-testid="2-rating"
          type="radio"
          name="rate"
          value="2"
          onChange={ (event) => chanceFunction(event) }
        />
        <input
          data-testid="3-rating"
          type="radio"
          name="rate"
          value="3"
          onChange={ (event) => chanceFunction(event) }
        />
        <input
          data-testid="4-rating"
          type="radio"
          name="rate"
          value="4"
          onChange={ (event) => chanceFunction(event) }
        />
        <input
          data-testid="5-rating"
          type="radio"
          name="rate"
          value="5"
          onChange={ (event) => chanceFunction(event) }
        />
        <p>{`Sua avaliação: ${rate}`}</p>
        <input
          data-testid="product-detail-evaluation"
          type="text"
          name="evaluation"
          id="product-detail-evaluation"
          size="50"
          placeholder="Mensagem (opcional)"
          onChange={ (event) => chanceFunction(event) }
          value={ evaluation }
        />
        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ () => submitFunction() }
          disabled={ !email }
        >
          Enviar
        </button>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  addProductCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf.isRequired,
};

export default ProductDetail;
