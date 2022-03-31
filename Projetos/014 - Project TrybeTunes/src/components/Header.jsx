import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.handleApi();
  }

  async handleApi() {
    const { name } = await getUser();
    this.setState({
      test: true,
      userName: name,
    });
  }

  render() {
    const { test, userName } = this.state;
    const header = (
      <span>
        <p>Header</p>
        <p data-testid="header-user-name">{userName}</p>
        <Link data-testid="link-to-search" to="/search">Seach</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </span>
    );

    return (
      <div data-testid="header-component">
        { test ? header : <Loading /> }
      </div>
    );
  }
}

export default Header;
