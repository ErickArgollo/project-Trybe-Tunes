import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './style/Favorites.css';
import HeaderMobile from '../components/HeaderMobile';

export default class Favorites extends Component {
  state = {
    favorite: [],
    Loading: false,
    showHeader: false,
  };

  componentDidMount() {
    this.updateFavoriteInfos();
  }

  updateFavoriteInfos = async () => {
    this.setState({ Loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favorite: favorites, Loading: false });
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
    const { favorite, Loading, showHeader } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        <span
          className="material-icons burguer"
          onClick={ this.toggleMenu }
        >
          menu
        </span>
        {
          showHeader && <HeaderMobile />
        }
        <div className="page-favorites-container">

          <div className="title-container">
            <h2>Músicas Favoritas</h2>
          </div>
          <div className="song-list-container">
            <div className="song-list">
              {
                Loading ? <div className="loading" />
                  : favorite.map((e) => (
                    <MusicCard
                      key={ e.trackId }
                      song={ e }
                      update={ this.updateFavoriteInfos }
                    />))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
