import React from 'react';
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {},
      isLoading: true
     };
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
      isLoading: false
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
      isLoading: false
    })
  }

  loginStatus = async () => {
    await axios.get('/api/v1/logged_in', 
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
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
                    <Home {...props} loggedInStatus={this.state.isLoggedIn} isLoading={this.state.isLoading}/>
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
