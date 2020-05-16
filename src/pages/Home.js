import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import Approach from "../containers/Approach";
import Greet from "../containers/Greet";
import Login from "./Login";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      currentUser: {}
    }
    
  }

  // LOGIN
  updateCurrentUser = (data) => {
    this.setState({
      isLoading: false,
      isLoggedIn: true,
      currentUser: data.data.user
    })
  }

  deleteCurrentUser = async () => {
    await axios.delete('/api/v1/logout', {withCredentials: true})
    .then(response => {
      this.setState({
        isLoading: false,
        isLoggedIn: false,
        currentUser: {}
      })
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }


  loginStatus = async () => {
    await axios.get('/api/v1/logged_in', 
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.updateCurrentUser(response)
      } 
      else {
        this.deleteCurrentUser()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  componentDidMount() {
    this.loginStatus()
  }


  render() {
    const { isLoading, isLoggedIn, currentUser } = this.state;
    const { history } = this.props;

    console.log(currentUser)
    return (
        <div className="App">
          { isLoading? "Loading..." :
            <div>
            { 
              isLoggedIn ? 
              <div>
                <nav>
                  <img src={require("../images/logo.png")} alt="logo"/>
                  <div>
                    <a href="main.zoom.link" target="_blank">Go Back to Main Room</a>
                    <Link to='/login' onClick={this.deleteCurrentUser}>Log Out</Link> 
                  </div>
                </nav>
                <main>
                  <Approach 
                    currentUser={currentUser} 
                    />
                  <Greet />
                </main>
              </div>
              : 
              <div>
                <Login history={history} handleLogin={this.updateCurrentUser} loggedInStatus={isLoggedIn} />
              </div>
            }
            </div>
          }
        </div>
  )};
}

export default Home;
