import React, { Component } from 'react';
import Proptype from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
    //  songFavorite: [],

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    // const songFavorite = await getFavoriteSongs();
    this.setState({
      musics: musicList,
    //  songFavorite,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <section>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{musics[0]?.artistName}</p>
          <p data-testid="album-name">{musics[0]?.collectionName}</p>
          {musics.slice(1).map((music) => (
            <MusicCard
              key={ music.trackId }
              musicId={ music.trackId }
              //  favorite={ songFavorite }
              music={ music }
            />
          ))}
        </div>

      </section>
    );
  }
}
Album.propTypes = {
  match: Proptype.shape(),

}.isRequired;

export default Album;
