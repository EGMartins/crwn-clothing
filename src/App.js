import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { auth } from './firebase/firebase.utils'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component'

import Header from './components/header/header.component'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribedFromAuth = null;

  componentDidMount() {
    this.unsubscribedFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribedFromAuth();
  }
  
  render() {
    return(
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path={'/shop'} component={ShopPage} />
          <Route exact path={'/signIn'} component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
