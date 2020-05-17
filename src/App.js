import React from 'react';
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './styles/base.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
     this.handleLogin = this.handleLogin.bind(this)
     this.handleLogout = this.handleLogout.bind(this)
     this.state = { 
      isLoggedIn: false,
      currentUser: {},
      isLoading: true
     };
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      currentUser: data.user,
      isLoading: false
    })
    const newObject = {
      id: data.user.id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      affiliation: data.user.affiliation
    }
    localStorage.setItem( 'CurrentUser', JSON.stringify(newObject) );
  }
  handleLogout = () => {
    localStorage.setItem( 'CurrentUser', "" );
    this.setState({
      isLoggedIn: false,
      currentUser: {},
      isLoading: false
    })
  }

  loginStatus = async () => {
    await axios.get('/api/v1/logged_in', 
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } 
      else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  componentDidMount() {
    this.loginStatus()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
                    <Home {...props} 
                      currentUser={this.state.currentUser}
                      handleLogout={this.handleLogout} 
                      loggedInStatus={this.state.isLoggedIn} 
                      isLoading={this.state.isLoading}/>
                    )}
            />
            <Route 
              exact path='/login' 
              render={props => (
                    <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                    )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
                    <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                    )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
