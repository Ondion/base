import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/ MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.handleMusicAPI = this.handleMusicAPI.bind(this);

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.handleMusicAPI();
    this.setState({
      loading: false,
    });
  }

  async handleMusicAPI() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const { artworkUrl100, artistName, collectionName } = response[0];
    this.setState(() => ({
      musics: response,
      artworkUrl100,
      artistName,
      collectionName,
    }));
  }

  render() {
    const { musics,
      loading, artworkUrl100, artistName, collectionName, trackId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <p>Album</p>
            <div>
              <img src={ artworkUrl100 } alt={ `${artistName}, ${collectionName}` } />
              <h1 data-testid="artist-name">{ artistName }</h1>
              <h2 data-testid="album-name">{ collectionName }</h2>
            </div>
            <div>
              { musics.map((e) => (e.trackId && <MusicCard key={ trackId } { ...e } />)) }
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
