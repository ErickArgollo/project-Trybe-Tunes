import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './style/MusicCard.css';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
    favoriteList: '',
  };

  componentDidMount() {
    this.takeFavoriteList();
  }

  takeFavoriteList = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites }, this.isFavorite);
  };

  isFavorite = () => {
    const { favoriteList } = this.state;
    const { song } = this.props;
    const search = favoriteList.some((e) => +e.trackId === +song.trackId);
    if (search) {
      this.setState({ isFavorite: true });
    }
  };

  favoriteSongs = async (event) => {
    const { update } = this.props;
    const { value, checked } = event.target;
    if (checked) {
      this.setState({ isLoading: true });
      await addSong(JSON.parse(value));
      this.setState({ isLoading: false, isFavorite: true });
      update();
    } else {
      this.setState({ isLoading: true });
      await removeSong(JSON.parse(value));
      this.setState({ isLoading: false, isFavorite: false });
      update();
    }
  };

  render() {
    const { song } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div className="song">
        <ul type="none" className="ul-songs">
          {
            !isLoading
              ? (
                <li className="test">
                  <span className="song-name">{song.trackName}</span>
                  <div className="audio-container">
                    <audio
                      data-testid="audio-component"
                      src={ song.previewUrl }
                      controls
                      className="audio"
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                  </div>
                  <div className="checkbox-container">
                    <label
                      htmlFor={ song.trackId }
                      data-testid={ `checkbox-music-${song.trackId}` }
                      className="material-icons favorite"
                      style={ {
                        color: isFavorite ? 'red' : 'gray',
                      } }
                    >
                      <input
                        type="checkbox"
                        onChange={ this.favoriteSongs }
                        value={ JSON.stringify(song) }
                        checked={ isFavorite }
                        id={ song.trackId }
                      />

                      favorite
                    </label>
                  </div>
                </li>)
              : <div className="loading" />

          }

        </ul>
      </div>

    );
  }
}

MusicCard.propTypes = {
  update: PropTypes.func.isRequired,
  song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};
