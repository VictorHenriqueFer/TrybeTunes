/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: false,
    newFavorites: [],
  };

  componentDidMount() {
    this.updtadMusics();
  }

  updtadMusics = async () => {
    this.setState({
      loading: true,
    });
    const newFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      newFavorites,
    });
  };

  render() {
    const { loading, newFavorites } = this.state;
    return (
      <section
        data-testid="page-favorites"
        className="flex "
      >
        <Header />
        {loading ? <Loading /> : (
          <div className="w-full h-screen">
            <div
              className="flex items-center justify-center bg-gradient-to-r from-sky-400 from-10% via-azul via-40% to-cyan-500 to-99%"
            >
              <div className="mx-auto px-2">

                <h1
                  className=" flex px-10 py-12 text-lg font-semibold text-white"
                >
                  <svg aria-label="headphones icon" className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z" />
                  </svg>
                  Músicas Favoritas
                </h1>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full mx-auto ml-4">
              {newFavorites.map((newFavorite) => (
                <MusicCard
                  key={ newFavorite.trackId }
                  trackId={ newFavorite.trackId }
                  music={ newFavorite }
                  updtadMusics={ this.updtadMusics }
                  className="my-4" // Adicionei uma margem no MusicCard para espaçamento entre os cards
                />
              ))}
            </div>
          </div>
        )}
      </section>

    );
  }
}

export default Favorites;
