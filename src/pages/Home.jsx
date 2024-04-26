/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.png';

class Home extends Component {
  state = {
    user: '',
    loading: false,

  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  clickButton = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { user, loading } = this.state;
    const numberMin = 3;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <section className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-400 from-10% via-azul via-40% to-cyan-500 to-90%">
              <div className=" w-full max-w-xl rounded-lg bg-white">

                <div className="max-w-sm mx-auto ">
                  <div
                    data-testid="page-login"
                    className="flex justify-center items-center mx-auto mt-10"
                  >
                    <img src={ logo } alt="logo" className="px-auto mx-auto" />
                  </div>
                  <form>
                    <div className=" mt-10 flex justify-center">

                      <input
                        className="block mx-8 mt-4 w-full px-4 py-2 mt-2 text-azul placeholder-gray-500 bg-white border-2 border-azul rounded-full focus:border-blue-400
                        focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-azul placeholder:text-center"
                        data-testid="login-name-input"
                        type="text"
                        name="user"
                        value={ user }
                        onChange={ this.onInputChange }
                        placeholder="Qual seu nome?"
                      />
                    </div>
                    <div className="flex items-center justify-center my-8">

                      <button
                        className="bg-azul hover:bg-blue-700 text-white font-bold py-2 px-4 w-80 rounded-full focus:outline-none focus:shadow-outline"
                        data-testid="login-submit-button"
                        disabled={ user.length < numberMin }
                        onClick={ this.clickButton }
                      >
                        ENTRAR
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

          )
        }

      </div>
    );
  }
}
Home.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
export default Home;
