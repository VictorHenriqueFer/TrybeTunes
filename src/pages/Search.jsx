/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
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
    buttonClicked: false,

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
      buttonClicked: true,

    });
    const albums = await searchAlbumsAPI(artistName);
    console.log(albums);
    this.setState({
      loading: false,
      albums,
    });
  };

  render() {
    const minArtist = 2;
    const { artistName, loading, albums, pesquise, buttonClicked } = this.state;
    return (
      <section className="flex">
        <Header />
        <div className="flex flex-col h-screen w-full overflow-auto ">
          <div className="bg-gradient-to-r from-sky-400 from-10% via-azul via-40% to-cyan-500 to-99% flex justify-center">
            <form>
              <div className="flex mx-auto mt-20 mb-20">

                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 text-azul placeholder-gray-500 bg-white border-2 border-azul rounded-full focus:border-blue-400
                  placeholder:text-sm placeholder:text-center"
                  type="text"
                  data-testid="search-artist-input"
                  name="artistName"
                  value={ artistName }
                  placeholder="NOME DO ARTISTA"
                  onChange={ this.handleInputChange }
                />

                <button
                  className="w-30 ml-1 px-4 py-2 mt-2 bg-marinho hover:bg-blue-700 text-white font-sm py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  data-testid="search-artist-button"
                  onClick={ this.handleClickButton }
                  disabled={ artistName.length < minArtist }
                >
                  PROCURAR

                </button>
              </div>
            </form>
          </div>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <div className="">
                <div className="flex justify-center mx-auto my-10">
                  {albums.length > 0 && (
                    <h3
                      className=" mr-20 italic text-xl font-light text-azul text-center"
                    >
                      Resultado de álbuns do Artista:
                      {' '}
                      {pesquise}

                    </h3>
                  )}
                </div>
                <div className="container px-2 py-4 mx-auto grid grid-cols-4 gap-8">
                  {albums.length === 0 && buttonClicked ? (
                    <div className="flex ml-[100%] mx-auto my-10">
                      <h1 className="mt-2 italic text-6xl font-extralight text-azul">Ops!</h1>
                      <h3 className=" mr-20 italic text-3xl font-semibold text-sky-400 text-center ">Nenhum álbum foi encontrado</h3>
                    </div>
                  ) : (
                    albums.map((album) => (

                      <Link
                        key={ album.collectionId }
                        className="flex flex-col items-center p-4 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-200 rounded-xl"
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        <img
                          className="object-cover w-26 h-26 rounded-full ring-4 ring-gray-300"
                          src={ album.artworkUrl100 }
                          alt={ album.name }
                        />
                        <h3
                          className="mt-4 text-sm font-semibold text-black capitalize  group-hover:text-slate-950"
                        >
                          {album.collectionName}
                        </h3>
                        <p className="mt-2 text-black capitalize">{album.artistName}</p>

                      </Link>

                    ))
                  )}
                </div>
              </div>
            )}
            <div />
          </div>
        </div>
      </section>
    );
  }
}
export default Search;
