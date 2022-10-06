import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';
import './style/Header.css';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
    imageUrl: '',
  };

  componentDidMount() {
    this.getUserName();
    const imageUrl = localStorage.getItem('imgUrl');
    this.setState({ imageUrl });
  }

  getUserName = async () => {
    const username = await getUser();

    this.setState({ userName: username.name,
      isLoading: false });
  };

  render() {
    const { userName, isLoading, imageUrl } = this.state;

    return (
      <header data-testid="header-component" className="header">
        <img src={ logo } alt="logo" className="header-logo" />
        <nav className="nav-container">
          <div className="links-container">
            <span className="material-icons search">
              search
            </span>
            <NavLink
              to="/search"
              data-testid="link-to-search"
              className="navLink"
              activeClassName="selected"
            >
              Pesquisa
            </NavLink>
          </div>

          <div className="links-container">
            <span className="material-icons search">
              star_outline
            </span>
            <NavLink
              to="/favorites"
              data-testid="link-to-favorites"
              className="navLink"
              activeClassName="selected"
            >
              Favoritas
            </NavLink>
          </div>

          <div className="links-container">
            <span className="material-icons search">
              account_circle
            </span>
            <NavLink
              to="/profile"
              data-testid="link-to-profile"
              className="navLink profile"
              activeClassName="selected"
            >
              <span className="profile-text">Perfil</span>
            </NavLink>
          </div>
        </nav>
        {
          isLoading ? <div className="loading-header" />
            : (
              <div className="header-image-name-container">
                <img src={ imageUrl } alt="profileImg" className="header-profile-img" />
                <h2 data-testid="header-user-name">
                  {userName}
                </h2>
              </div>)
        }
      </header>
    );
  }
}
