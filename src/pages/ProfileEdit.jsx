import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './style/ProfileEdit.css';
import HeaderMobile from '../components/HeaderMobile';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    checkInfos: true,
    name: '',
    image: '',
    description: '',
    email: '',
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
    const { name, image, description, email } = infos;
    this.setState({
      loading: false,
      name,
      image,
      description,
      email }, this.validateInfos);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validateInfos);
  };

  validateInfos = () => {
    const { name, image, description, email } = this.state;
    const validateLength = name.length > 0
    && image.length > 0 && description.length > 0 && email.length > 0;
    const regexMail = /\S+@\S+\.\S+/;
    const validateMail = regexMail.test(email);

    if (validateLength && validateMail) {
      this.setState({ checkInfos: false });
    } else {
      this.setState({ checkInfos: true });
    }
  };

  redirectToProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  updateInfos = async () => {
    const { name, image, description, email } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, image, description, email });
    this.redirectToProfile();
    this.setState({ loading: false });
    localStorage.setItem('imgUrl', image);
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
    const { loading, name, image, description, email, checkInfos, imgUrl,
      showHeader } = this.state;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header img={ image } />

        <div className="page-profile-edit-container">
          {
            showHeader && <HeaderMobile />
          }

          <span
            className="material-icons burguer-search"
            onClick={ this.toggleMenu }
          >

            menu
          </span>
          <div className="title-container">
            <h2>Edição de Perfil</h2>
          </div>
          <div className="profile-edit-form-container">
            <div className="picture-form-container">
              {
                !loading && <img
                  src={ imgUrl }
                  className="profile-picture"
                  alt={ name }
                />
              }
              {
                loading ? <div className="loading" />
                  : (
                    <form>
                      <div className="form-label-container">
                        <label htmlFor="nome">
                          <h3>Nome</h3>
                          <h5>Fique a vontade para usar seu nome social</h5>
                          <input
                            type="text"
                            name="name"
                            placeholder="Digite seu nome"
                            id="nome"
                            value={ name }
                            data-testid="edit-input-name"
                            onChange={ this.handleInputChange }
                            className="profile-edit-input-name"
                          />
                        </label>
                      </div>

                      <div className="form-label-container">
                        <label htmlFor="email">
                          <h3>Email</h3>
                          <h5>Escolha um e-mail que consulte diariamente</h5>
                          <input
                            type="email"
                            name="email"
                            value={ email }
                            id="email"
                            data-testid="edit-input-email"
                            onChange={ this.handleInputChange }
                            placeholder="usuario@usuario.com.br"
                            className="profile-edit-input-name"
                          />
                        </label>
                      </div>

                      <div className="form-label-container">
                        <label htmlFor="description">
                          <h3>Descrição</h3>
                          <textarea
                            name="description"
                            id="description"
                            cols="35"
                            rows="30"
                            value={ description }
                            className="profile-edit-input-name"
                            maxLength="148"
                            onChange={ this.handleInputChange }
                            placeholder="Sobre mim"
                          />
                        </label>
                      </div>

                      <div className="form-label-container">
                        <label htmlFor="img">
                          <h3>Insira uma imagem</h3>
                          <input
                            type="text"
                            name="image"
                            value={ image }
                            id="img"
                            data-testid="edit-input-image"
                            onChange={ this.handleInputChange }
                            placeholder="url"
                            className="profile-edit-input-name"
                          />
                        </label>
                      </div>
                      <button
                        data-testid="edit-button-save"
                        type="button"
                        disabled={ checkInfos }
                        className="profile-edit-save-button"
                        onClick={ this.updateInfos }
                      >
                        SALVAR
                      </button>
                    </form>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};
