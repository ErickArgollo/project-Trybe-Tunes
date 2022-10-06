import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './style/Search.css';
import HeaderMobile from '../components/HeaderMobile';

export default class Search extends Component {
  state = {
    searchInput: '',
    cloneSearchInput: '',
    buttonDisabled: true,
    album: '',
    isLoadingApi: false,
    showSearchBar: false,
    showHeader: false,
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value }, this.validateInput);
  };

  validateInput = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  searchArtist = async () => {
    const { searchInput } = this.state;
    this.setState({ isLoadingApi: true,
      cloneSearchInput: searchInput,
      showSearchBar: false });
    const response = await searchAlbumsAPI(searchInput);
    this.setState({
      album: response,
      isLoadingApi: false,
      searchInput: '',
      showSearchBar: true }, this.validateInput);
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
    const {
      buttonDisabled,
      searchInput,
      isLoadingApi,
      showSearchBar,
      cloneSearchInput,
      album,
      showHeader } = this.state;

    return (
      <div data-testid="page-search" className="search-container">
        <Header />
        <div className="form-song-container">
          {
            showHeader && <HeaderMobile />
          }

          <span
            className="material-icons burguer-search"
            onClick={ this.toggleMenu }
          >

            menu
          </span>
          {
            isLoadingApi ? <div className="loading" />
              : (
                <form className="content">
                  <div>
                    <input
                      type="text"
                      data-testid="search-artist-input"
                      value={ searchInput }
                      onChange={ this.handleInputChange }
                      className="search-input"
                      placeholder="DIGITE A SUA PESQUISA"
                    />
                    <button
                      type="button"
                      data-testid="search-artist-button"
                      disabled={ buttonDisabled }
                      onClick={ this.searchArtist }
                      className="button-search"
                    >
                      PROCURAR
                    </button>
                  </div>
                </form>)
          }
          { showSearchBar && (
            <div className="album-text-container">
              <p className="result-search-album">
                Resultado de álbuns de
                {' '}
                {cloneSearchInput}
              </p>
              {
                album.length === 0 ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <div className="albuns-container">
                      {
                        album.map((e, index) => (
                          <div
                            key={ index }
                            className="album-container"
                          >
                            <img
                              src={ e.artworkUrl100 }
                              alt="img"
                              className="albumImg"
                            />

                            <NavLink
                              to={ `/album/${e.collectionId}` }
                              data-testid={ `link-to-album-${e.collectionId}` }
                              className="nav-album-search"
                            >
                              {e.collectionName}
                            </NavLink>
                          </div>))

                      }
                    </div>)

              }
            </div>)}
        </div>
      </div>
    );
  }
}
