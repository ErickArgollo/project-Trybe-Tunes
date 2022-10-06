import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import './style/Login.css';
import logo from '../images/logo.png';

export default class Login extends Component {
  state = {
    textLogin: '',
    MoreThreeInputLength: false,
    isLoading: false,
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ textLogin: value }, this.validateInputText);
  };

  validateInputText = () => {
    const { textLogin } = this.state;
    const MIN_LENGTH = 3;
    if (textLogin.length >= MIN_LENGTH) {
      this.setState({ MoreThreeInputLength: true });
    } else {
      this.setState({ MoreThreeInputLength: false });
    }
  };

  userCreate = async () => {
    const { history } = this.props;
    const { textLogin } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: textLogin });
    this.setState({ isLoading: false });
    history.push('/search');
    localStorage.setItem('imgUrl', 'https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg');
  };

  render() {
    const { MoreThreeInputLength, isLoading } = this.state;
    return (

      <div data-testid="page-login" className="login-container">

        {
          isLoading
            ? <div className="loading" />
            : (
              <div className="form-container">
                <img src={ logo } alt="logo" />
                <form>
                  <input
                    type="text"
                    name=""
                    onChange={ this.handleInputChange }
                    data-testid="login-name-input"
                    className="input-login"
                    placeholder="Qual é o seu nome?"
                  />
                  <button
                    type="button"
                    disabled={ !MoreThreeInputLength }
                    onClick={ this.userCreate }
                    data-testid="login-submit-button"
                    className="input-btn"
                  >
                    Entrar

                  </button>
                </form>
              </div>)

        }

      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
