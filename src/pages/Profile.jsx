/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom/';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import perfilExemple from '../images/foto.png';

class Profile extends Component {
  state = {
    loading: false,
    user: {},
  };

  async componentDidMount() {
    await this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const perfil = await getUser();
    this.setState({
      user: perfil,
      loading: false,
    });
  };

  render() {
    const { loading, user } = this.state;
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
                    src={ user.image !== '' ? user.image : perfilExemple }
                    alt="user"
                  />
                </div>
                <div className="py-10 px-10 mt-20 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-500">Nome</h3>
                    <p className="text-ligth font-sm">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-500">Email</h3>
                    <p className="text-ligth font-sm">
                      {user.email}
                      {' '}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-500">Descrição</h3>
                    <p className="text-ligth font-sm">
                      {user.description}
                      {' '}
                      fnhjBASEDFHBASfyhdbASDASNDNAS
                    </p>
                  </div>
                  <div className="py-4 mx-auto">
                    <Link
                      className="border px-6 py-2 rounded-full bg-marinho hover:bg-blue-700 text-white font-sm focus:outline-none focus:shadow-outline"
                      to="/profile/edit"
                    >
                      Editar perfil
                    </Link>
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

export default Profile;
