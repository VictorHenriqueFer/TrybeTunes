/* eslint-disable max-len */
import React, { Component } from 'react';
import Proptype from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      musics: musicList,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <section className="flex">
        <Header />
        <div className="w-full h-screen overflow-auto">
          <div className="w-full" data-testid="page-album">
            <div
              className="bg-gradient-to-r from-sky-400 from-10% via-azul via-40% to-cyan-500 to-99%
             flex flex-col items-center justify-center mb-6 md:mb-10 p-4 md:p-8 rounded-lg"
            >
              <img
                src={ musics[0]?.artworkUrl100 }
                alt={ musics[0]?.collectionName }
                data-testid="album-image"
                className="w-40 h-40 rounded-lg"
              />
              <p className="text-xl font-medium tracking-tight text-white">
                {musics[0]?.artistName}
              </p>
              <p className="text-white">{musics[0]?.collectionName}</p>
            </div>
            <div className="mt-8 ">
              {musics.slice(1).map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackId={ music.trackId }
                  music={ music }
                  updtadMusics={ () => {} }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    );
  }
}
Album.propTypes = {
  match: Proptype.shape(),

}.isRequired;

export default Album;
