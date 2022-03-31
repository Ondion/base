import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateUser, getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleApis = this.handleApis.bind(this);
    this.changeApis = this.changeApis.bind(this);
    this.testChars = this.testChars.bind(this);
    this.testEmail = this.testEmail.bind(this);

    this.state = {
      loading: false,
      testChar: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.handleApis();
  }

  async handleApis() {
    this.setState(({ loading }) => ({ loading: !loading }));
    const response = await getUser();
    this.setState({
      name: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
    });
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  async changeApis() {
    this.setState(({ loading }) => ({ loading: !loading }));
    const { name, email, description, image } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState(({ loading }) => ({ loading: !loading }));
    const { history } = this.props;
    history.push('/profile');
  }

  testChars({ target }) {
    this.setState(() => ({ [target.name]: target.value }));
    const { name, email, description, image } = this.state;
    if (name.length > 1
        && (email.length > 1 && this.testEmail(email))
        && description.length > 1
        && image.length > 1) {
      this.setState({ testChar: false });
    } else {
      this.setState({ testChar: true });
    }
  }

  testEmail(email) {
    if (
      email.search('@') > 0
        && email.search('@') < email.length
    ) {
      return true;
    }
  }

  render() {
    const { name, email, description, image } = this.state;
    const { loading, testChar } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar perfil</p>
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <form action="">
              <label htmlFor="login-name-input">
                <input
                  data-testid="edit-input-name"
                  type="text"
                  className="login-name-input"
                  name="name"
                  placeholder="Nome:"
                  value={ name }
                  onChange={ (event) => this.testChars(event) }
                />

                <input
                  data-testid="edit-input-email"
                  type="text"
                  name="email"
                  placeholder="E-mail:"
                  value={ email }
                  onChange={ (event) => this.testChars(event) }
                />

                <input
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  placeholder="Descrição:"
                  value={ description }
                  onChange={ (event) => this.testChars(event) }
                />

                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  placeholder="Imagem:"
                  value={ image }
                  onChange={ (event) => this.testChars(event) }
                />

              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ testChar }
                onClick={ () => this.changeApis() }
              >
                Enviar
              </button>

            </form>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ProfileEdit; // editar.
