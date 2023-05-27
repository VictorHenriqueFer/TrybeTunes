import React, { Component } from 'react';
import { Link } from 'react-router-dom/';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistName: '',
    loading: false,
    albums: [],
    pesquise: '',

  };

  handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClickButton = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({
      loading: true,
      pesquise: artistName,
      artistName: '',
    });
    const albums = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      albums,
    });
  };

  render() {
    const minArtist = 2;
    const { artistName, loading, albums, pesquise } = this.state;
    return (
      <section>

        <div data-testid="page-search">
          <Header />
        </div>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            placeholder="Nome do Artista"
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="search-artist-button"
            onClick={ this.handleClickButton }
            disabled={ artistName.length < minArtist }
          >
            Pesquisar

          </button>
        </form>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {albums.length > 0 && (
              <h3>
                Resultado de álbuns de:
                `
                {pesquise}
                `

              </h3>
            )}
            {albums.length === 0 ? (<h3>Nenhum álbum foi encontrado</h3>
            ) : (
              albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <h3>{album.collectionName}</h3>
                    <p>{album.artistName}</p>
                    <img src={ album.artworkUrl100 } alt={ album.name } />

                  </Link>

                </div>
              ))
            )}
          </div>
        )}
        <div />
      </section>
    );
  }
}
export default Search;
