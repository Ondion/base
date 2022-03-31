import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.recoverFav = this.recoverFav.bind(this);
    this.changeSong = this.changeSong.bind(this);
    this.testFlag = this.testFlag.bind(this);

    this.state = {
      loading: false,
      isCheck: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.recoverFav();
  }

  async recoverFav() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  async changeSong(checked) {
    this.setState(({ loading }) => ({ loading: !loading }));
    if (checked) {
      await addSong(this.props);
      this.testFlag();
    } else {
      await removeSong(this.props);
      this.testFlag();
    }
    await this.recoverFav();
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  testFlag() {
    const { flag } = this.props;
    if (flag) {
      flag();
    } else {
      return 0;
    }
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
    } = this.props;
    const { loading, isCheck, favorites } = this.state;

    return (
      loading ? <Loading /> : (
        <>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code> audio </code>
          </audio>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name={ `checkbox-music-${trackId}` }
              id={ `checkbox-music-${trackId}` }
              onClick={ ({ target: { checked } }) => this.changeSong(checked) }
              checked={ isCheck || favorites.find((e) => e.trackId === trackId) }
            />
          </label>
        </>
      )
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  flag: PropTypes.func.isRequired,
};

export default MusicCard;
