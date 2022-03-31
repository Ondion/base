import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.handleSearch = this.handleSearch.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);

    this.state = {
      testAlbum: true,
      albums: [],
      loadingStatus: true,
      testValue: '',
      handleDisable: true,
      upLimit: 2,
    };
  }

  handleSearch({ target: { value } }) {
    const { upLimit } = this.state;
    this.setState({
      testValue: value,
      copy: value,
      handleDisable: value.length < upLimit,
    });
  }

  async searchAlbums() {
    const { testValue } = this.state;
    this.setState({
      loadingStatus: false,
      testValue: '',
    });
    const response = await searchAlbumsAPI(testValue);
    this.setState({
      loadingStatus: true,
      albums: response,
      testAlbum: response.length > 0,
    });
  }

  render() {
    const { handleDisable,
      testValue,
      loadingStatus,
      albums,
      testAlbum,
      copy } = this.state;

    const noResult = (
      <p><strong>Nenhum álbum foi encontrado</strong></p>
    );
    const form = (
      <>
        <p>Search!</p>
        <form action="">
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              type="text"
              className="search-artist-input"
              onChange={ this.handleSearch }
              value={ testValue }
            />
          </label>

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ handleDisable }
            onClick={ this.searchAlbums }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
    return (
      <div data-testid="page-search">
        <Header />
        {loadingStatus ? form : <Loading />}
        {testAlbum ? (
          <>
            {albums.length === 0 ? null : <p>{`Resultado de álbuns de: ${copy}`}</p>}
            {albums.map(({ artistName,
              collectionId,
              artworkUrl100,
              collectionName,
            }) => (
              <div key={ collectionId }>
                <p>{artistName}</p>
                <p>{collectionName}</p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ artistName } />
                </Link>
              </div>
            ))}
          </>
        ) : (
          noResult
        )}
      </div>
    );
  }
}

export default Search;
