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
      <section data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          <div>
            {newFavorites.map((newFavorite) => (
              <MusicCard
                key={ newFavorite.trackId }
                trackId={ newFavorite.trackId }
                music={ newFavorite }
                updtadMusics={ this.updtadMusics }
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Favorites;
