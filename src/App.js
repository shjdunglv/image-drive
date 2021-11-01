import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Images from './components/Images';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Welcome from './components/auth/RegisterSuccessly';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {Auth} from 'aws-amplify';

library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    identityId: null,
  }

  setAuthStatus = authenticationStatus =>{
  this.setState({isAuthenticated: authenticationStatus});
}
setIdentityId = identityId => {
  this.setState({identityId:identityId});
}
setUser = user => {
  this.setState({user:user});
}
async componentDidMount() {
  try {
    const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
    const user = await Auth.currentAuthenticatedUser();
    this.setUser(user);
    const credentials = await Auth.currentCredentials();
    console.log('Cognito identity ID:', credentials.identityId);
    this.setIdentityId(credentials.identityId)
  } catch(error) {
    if (error !== 'No current user') {
      console.log(error);
    }
  }

  this.setState({ isAuthenticating: false });
}
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      identityId: this.state.identityId,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    
    return (
      <div className="App">
      {!this.state.isAuthenticating &&(
        <Router>
          <div>
            <Navbar auth={authProps}/>
            <Switch>
            <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/images" render={(props) => <Images {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} setIdentityId={this.setIdentityId} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/register-successly" render={(props) => <RegisterSuccessly {...props} auth={authProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      )}

      </div>
    );
  }
}

export default App;
