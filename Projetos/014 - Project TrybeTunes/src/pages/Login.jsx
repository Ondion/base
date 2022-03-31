import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { logInDisable, handleText, handleClick } = this.props;
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="login-name-input">
            <input
              data-testid="login-name-input"
              type="text"
              className="login-name-input"
              name="name"
              placeholder="Nome:"
              onChange={ handleText }
            />

            <input
              type="text"
              name="email"
              placeholder="E-mail:"
              onChange={ handleText }
            />

            <input
              type="text"
              name="description"
              placeholder="Descrição:"
              onChange={ handleText }
            />

            <input
              type="text"
              name="image"
              placeholder="Imagem:"
              onChange={ handleText }
            />

          </label>

          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ logInDisable }
            onClick={ handleClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logInDisable: PropTypes.bool.isRequired,
  handleText: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Login;
