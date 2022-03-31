import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.handleText = this.handleText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRender = this.handleRender.bind(this);

    this.state = {
      loadingStatus: 'login',
      logInDisable: true,
      handleText: this.handleText,
      handleClick: this.handleClick,
    };
  }

  handleText({ target }) {
    const minChar = 3;
    this.setState({
      [target.name]: target.value,
      logInDisable: target.value.length < minChar,
    });
  }

  async handleClick() {
    this.setState({ loadingStatus: true });
    const { name, email, description, image } = this.state;
    await createUser({ name, email, description, image });
    this.setState({ loadingStatus: false });
  }

  handleRender(rProps) {
    const { loadingStatus } = this.state;
    if (loadingStatus === 'login') {
      return <Login { ...this.state } />;
    }
    return loadingStatus ? <Loading { ...rProps } /> : <Redirect to="/search" />;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Route
            exact
            path="/"
            render={ (rProps) => (this.handleRender(rProps)) }
          />

          <Route
            path="/Search"
            render={ () => <Search { ...this.state } /> }
          />

          <Route
            exact
            path="/Album/:id"
            render={ (rProps) => <Album { ...rProps } { ...this.state } /> }
          />

          <Route
            path="/Favorites"
            render={ () => <Favorites { ...this.state } /> }
          />

          <Route
            exact
            path="/Profile"
            render={ () => <Profile { ...this.state } /> }
          />

          <Route
            path="/Profile/edit"
            render={ (rProps) => <ProfileEdit { ...rProps } { ...this.state } /> }
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
