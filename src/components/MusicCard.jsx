import React, { Component } from 'react';
import Proptype from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {

    loading: false,
    checked: false,
  };

  onAddFavorite = async ({ target }) => {
    const { music } = this.props;
    this.setState({
      loading: true,

    });
    if (target.checked) {
      await addSong(music);
    }
    this.setState({
      loading: false,
      checked: target.checked,
    });
  };

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    return (
      <section>
        { loading ? <Loading /> : (
          <div>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label
              htmlFor="favorite"
            >
              Favorita

              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                checked={ checked }
                onChange={ this.onAddFavorite }
              />
            </label>
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