import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './style/Profile.css';
import HeaderMobile from '../components/HeaderMobile';

export default class Profile extends Component {
  state = {
    userinfos: {},
    loading: true,
    imgUrl: '',
    showHeader: false,
  };

  componentDidMount() {
    this.getUserInfos();
    const imgUrl = localStorage.getItem('imgUrl');
    this.setState({ imgUrl });
  }

  getUserInfos = async () => {
    const infos = await getUser();
    this.setState({ userinfos: infos, loading: false });
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
    const { userinfos, loading, imgUrl, showHeader } = this.state;
    const { name, email, description } = userinfos;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        <div className="page-profile-container">
          {
            showHeader && <HeaderMobile />
          }
          <span
            className="material-icons burguer-search burguer-profile"
            onClick={ this.toggleMenu }
          >
            menu
          </span>

          <div className="title-container">
            <h2>Perfil</h2>
          </div>
          <div className="profile-edit-form-container">
            <div className="picture-form-container ">
              {
                !loading && <img
                  src={ imgUrl }
                  alt={ name }
                  className="profile-picture"
                />
              }

              {
                loading ? <div className="loading" />
                  : (
                    <div className="profile-content">
                      <div>
                        <h3>Nome</h3>
                        <p>{name}</p>
                      </div>

                      <div>
                        <h3>E-mail</h3>
                        <p>{email}</p>
                      </div>

                      <div>
                        <h3>Descrição</h3>
                        <p>{description}</p>
                      </div>

                      <NavLink
                        to="/profile/edit"
                        className="edit-profile-link"
                      >
                        Editar perfil
                      </NavLink>
                    </div>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
