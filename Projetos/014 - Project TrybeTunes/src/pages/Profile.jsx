import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.handleAPI = this.handleAPI.bind(this);

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.handleAPI();
  }

  async handleAPI() {
    this.setState(({ loading }) => ({ loading: !loading }));
    const response = await getUser();
    this.setState(({ loading }) => ({ loading: !loading, user: response }));
  }

  render() {
    const { loading } = this.state;
    const { user: { description, email, image, name } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
        {loading ? <Loading /> : (
          <>
            <Link to="/profile/edit">Editar perfil</Link>
            <p>{`${name}`}</p>
            <p>{`${email}`}</p>
            <p>{`${description}`}</p>
            <img data-testid="profile-image" src={ image } alt={ `Imagem de ${name}` } />
          </>
        ) }
      </div>
    );
  }
}

export default Profile;
