/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import perfilExemple from '../images/foto.png';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: false,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',

  };

  async componentDidMount() {
    await this.getUser();
  }

  getUser = async () => {
    this.setState({
      loading: true,
    });
    const perfil = await getUser();
    this.setState({
      userName: perfil.name,
      userEmail: perfil.email,
      userDescription: perfil.description,
      userImage: perfil.image,

      loading: false,
    });
  };

  handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClickButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { userName, userDescription, userEmail, userImage } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({ name: userName, description: userDescription, email: userEmail, image: userImage });
    this.setState({
      loading: false,
    });
    history.push('/profile');
  };

  render() {
    const { loading, userName, userDescription, userEmail, userImage } = this.state;
    const isValidName = /^\w{3,100}$/.test(userName);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail);

    return (
      <section
        data-testid="page-profile"
        className="flex"
      >
        <div className="flex w-full h-screen">
          <Header />
          { loading ? <Loading /> : (
            <div
              className="flex w-full h-[170px]
          bg-gradient-to-r from-sky-400 from-10% via-azul via-40% to-cyan-500 to-99%"
            >
              <div className="flex mx-auto mt-20">
                <div className="py-4 px-6 -ml-20">
                  <img
                    className="w-44 h-44 rounded-full drop-shadow-md"
                    data-testid="profile-image"
                    src={ userImage !== '' ? userImage : perfilExemple }
                    alt="user"
                  />
                  <div>
                    <input
                      data-testid="edit-input-image"
                      type="url"
                      id="image"
                      placeholder="Insira a URL da imagem de perfil"
                      name="userImage"
                      value={ userImage }
                      onChange={ this.handleInputChange }
                      className="block w- px-3 py-2 mt-2 text-sm text-gray-600
                  bg-white border border-gray-700 placeholder:text-center hover:border-green-500 focus:border-green-500 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="py-10 px-10 mt-20 space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">Username</label>

                    <input
                      data-testid="edit-input-name"
                      type="text"
                      placeholder="Nome"
                      id="name"
                      name="userName"
                      value={ userName }
                      pattern="\w{3,100}"
                      onChange={ this.handleInputChange }
                      className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 "
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-500 dark:text-gray-300">Email</label>
                    <div className="relative flex items-center mt-2">
                      <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>

                      <input
                        data-testid="edit-input-email"
                        type="email"
                        id="email"
                        name="userEmail"
                        value={ userEmail }
                        onChange={ this.handleInputChange }
                        placeholder="john@example.com"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div className="mt-6">
                      <label htmlFor="Description" className="block text-sm text-gray-500 dark:text-gray-300">Description</label>
                      <textarea
                        data-testid="edit-input-description"
                        placeholder="Sobre mim"
                        id="description"
                        name="userDescription"
                        value={ userDescription }
                        onChange={ this.handleInputChange }
                        className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500
            rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700
            focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="py-4 mx-auto">
                      <button
                        data-testid="edit-button-save"
                        type="button"
                        onClick={ this.handleClickButton }
                        disabled={ !isValidEmail || !isValidName }
                        className="bg-azul hover:bg-blue-700 text-white font-bold py-2 px-4 w-80 rounded-full focus:outline-none focus:shadow-outline"
                      >
                        SALVAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default ProfileEdit;
