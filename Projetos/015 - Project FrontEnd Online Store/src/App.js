import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import Card from './components/Card';
import Categories from './components/Categories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { getAll } from './services/api';
import Checkout from './pages/Checkout';
import Badge from './components/Badge';

class App extends Component {
  constructor() {
    super();

    this.testeStorage = this.testeStorage.bind(this);
    this.getRadio = this.getRadio.bind(this);
    this.renderHome = this.renderHome.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAPIs = this.handleAPIs.bind(this);
    this.addProductCart = this.addProductCart.bind(this);
    this.handleCart = this.handleCart.bind(this);

    this.state = {
      handleCart: this.handleCart,
      returnCart: this.returnCart,
      getRadio: this.getRadio,
      categories: undefined,
      cart: this.testeStorage(),
    };
  }

  handleSearch(event) {
    const search = event.target.value;
    this.setState(() => ({ search }));
  }

  async handleAPIs() {
    const { search, categories } = this.state;
    const response = await getAll(categories, search);
    const products = await response;
    this.setState({ products: products.results });
  }

  handleCart({ target: { name } }, checkid) {
    const { cart } = this.state;
    if (name === 'product-delete') {
      this.setState({
        cart: cart.filter(({ id }) => id !== checkid),
      });
    } if (name === 'product-increase-quantity') {
      this.setState({
        cart: cart.map((item) => {
          if (item.id === checkid) {
            item.quantity += 1;
            return item;
          } return item;
        }),
      });
    } if (name === 'product-decrease-quantity') {
      this.setState({
        cart: cart.map((item) => {
          if (item.id === checkid) {
            if (item.quantity === 1) {
              item.quantity = 1;
            } else {
              item.quantity -= 1;
            }
            return item;
          } return item;
        }),
      });
    }
  }

  getRadio(event) {
    this.setState(({ categories: event.target.value }));
    this.handleAPIs();
  }

  testeStorage() {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
      return storage;
    }
    return [];
  }

  addProductCart({ thumbnail, price, title, id, availableQuantity }) {
    const { cart } = this.state;
    const test = cart.find(({ id: idTest }) => idTest === id);
    if (test) {
      this.setState({
        cart: cart.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
            return item;
          } return item;
        }),
      });
    }
    if (!test) {
      const itemCart = {
        thumbnail,
        price,
        title,
        id,
        availableQuantity,
        quantity: 1,
      };
      this.setState((prev) => ({ cart: [...prev.cart, itemCart] }));
    }
  }

  renderHome() {
    const { products } = this.state;
    return (
      <>
        <Categories { ...this.state } />
        <div>
          <Badge { ...this.state } />
          <Link to="/cart" data-testid="shopping-cart-button">
            <button type="button">
              🛒
            </button>
          </Link>
        </div>
        <p data-testid=" home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input
          data-testid="query-input"
          type="search"
          placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
          size="50"
          onChange={ (event) => this.handleSearch(event) }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.handleAPIs() }
        >
          Buscar
        </button>
        {products && products.map((e) => (<Card
          key={ e.id }
          { ...e }
          addProductCart={ this.addProductCart }
        />))}
      </>
    );
  }

  render() {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (renderProps) => (this.renderHome(renderProps)) }
          />

          <Route
            exact
            path="/cart"
            render={ (renderProps) => (<Cart { ...renderProps } { ...this.state } />) }
          />

          <Route
            exact
            path="/productdetail/:id"
            render={ (rProps) => (<ProductDetail
              { ...rProps }
              { ...this.state }
              addProductCart={ this.addProductCart }
            />) }
          />

          <Route
            exact
            path="/checkout"
            render={ (rProps) => <Checkout { ...rProps } { ...this.state } /> }
          />

          <Route
            path="*"
            component={ NotFound }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
