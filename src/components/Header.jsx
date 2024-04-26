/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import logo from '../images/logo.png';
import perfil from '../images/foto.png';

class Header extends Component {
  state = {
    loading: true,
    user: {},

  };

  async componentDidMount() {
    const saveApi = await getUser();
    this.setState({ loading: false, user: saveApi });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
          <div href="#" className="mx-auto">
            <img className="w-auto h-10 sm:h-20" src={ logo } alt="" />
          </div>

          <div className="flex flex-col justify-between flex-1 mt-[50%]">
            <nav>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
              >

                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="mx-4 font-medium">Pesquisar</span>
              </Link>

              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart w-5 h-5 text-gray-600" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>

                <span className="mx-4 font-medium">Favoritos</span>
              </Link>

              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="mx-4 font-medium">Profile</span>
              </Link>
            </nav>

            {
              loading ? <Loading /> : (
                <div className="flex flex-col items-center mr-12">
                  <img className="object-cover w-8 h-8 mx-2 rounded-full" src={ user.image !== '' ? user.image : perfil } alt="avatar" />
                  <h4 className="mx-2 mt-2 font-medium text-gray-800 ">{user.name}</h4>

                </div>
              )
            }
          </div>
        </aside>
      </header>
    );
  }
}

export default Header;
