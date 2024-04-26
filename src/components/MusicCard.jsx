/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import Proptype from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    favorites: {},
  };

  async componentDidMount() {
    const newFavorite = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState((prevState) => ({
      favorites: {
        ...prevState.favorites,
        [trackId]: newFavorite.some((music) => music.trackId === trackId),
      },
    }));
  }

  onAddFavorite = async ({ target }) => {
    const { music, updtadMusics } = this.props;
    this.setState((prevState) => ({
      favorites: {
        ...prevState.favorites,
        [music.trackId]: target.checked,
      },
      loading: true,
    }));
    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      loading: false,
    });
    updtadMusics();
  };

  render() {
    const { music } = this.props;
    const { loading, favorites } = this.state;
    const checked = favorites[music.trackId] || false;
    return (
      <section className="flex">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex w-full items-center justify-center md:mr-16">
            <div className="flex items-center border-b-2 space-x-6">
              <div className="position-relative">
                <div className="w-36 ml-20 ml-1">
                  <p className="text-left whitespace-normal">{music.trackName}</p>
                </div>
              </div>
              <div className="mt-4 mb-2">
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              </div>
              <div className="checkbox w-44">
                <input
                  id={ `favorite-${music.trackId}` }
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  checked={ checked }
                  onChange={ this.onAddFavorite }
                  className="hidden"
                />
                <label htmlFor={ `favorite-${music.trackId}` } className="cursor-pointer flex items-center">
                  {checked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}
MusicCard.propTypes = {
  music: Proptype.shape(),

}.isRequired;

export default MusicCard;
