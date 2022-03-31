import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/ MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.recoverFav = this.recoverFav.bind(this);
    this.flag = this.flag.bind(this);

    this.state = {
      favorites: [],
      loading: false,
      flag: this.flag,
    };
  }

  componentDidMount() {
    this.setState(({ loading }) => ({ loading: !loading }));
    this.recoverFav();
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  async recoverFav() {
    this.setState(({ loading }) => ({ loading: !loading }));
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  flag() {
    this.setState(({ flag }) => ({ flag }));
    this.recoverFav();
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        {loading ? (
          <Loading />
        ) : (
          favorites.map((e) => (
            <MusicCard key={ e.trackId } { ...e } flag={ this.flag } />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
