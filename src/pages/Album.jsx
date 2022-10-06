import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './style/Album.css';
import HeaderMobile from '../components/HeaderMobile';

export default class Album extends Component {
  state = {
    listOfSongs: '',
    isLoading: true,
    showHeader: false,
  };

  componentDidMount() {
    this.songRequest();
  }

  songRequest = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({ listOfSongs: songs, isLoading: false });
  };

  updateFavoriteInfos = async () => {
    await getFavoriteSongs();
  };

  toggleMenu = () => {
    const { showHeader } = this.state;
    if (showHeader) {
      this.setState({ showHeader: false });
    } else {
      this.setState({ showHeader: true });
    }
  };

  render() {
    const { listOfSongs, isLoading, showHeader } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        {
          showHeader && <HeaderMobile />
        }

        <span
          className="material-icons burguer-album"
          onClick={ this.toggleMenu }
        >

          menu
        </span>
        <div className="page-album-container">
          <div className="album-infos-container">
            {
              !isLoading && (
                <div className="title-img-container">
                  <img
                    src={ listOfSongs[0].artworkUrl100 }
                    alt="img"
                    className="album-img"
                  />
                  <div className="album-song-text">
                    <p
                      data-testid="artist-name"
                      className="artist-name"
                    >
                      {listOfSongs[0].artistName}

                    </p>
                    <p
                      data-testid="album-name"
                      className="album-name"
                    >
                      {listOfSongs[0].collectionName}

                    </p>
                  </div>
                </div>)
            }
            <div className="song-list-container">
              <div className="song-list">
                {
                  !isLoading && listOfSongs.map((e, index) => {
                    if (index !== 0) {
                      return (<MusicCard
                        key={ e.trackId }
                        song={ e }
                        update={ this.updateFavoriteInfos }
                      />);
                    }
                    return null;
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
