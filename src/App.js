import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import notFound from './pages/notFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/album/:id" component={ Album } exact />
        <Route path="/favorites" component={ Favorites } exact />
        <Route path="/search" component={ Search } exact />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } exact />
        <Route path="*" component={ notFound } />

      </Switch>

    );
  }
}

export default App;
