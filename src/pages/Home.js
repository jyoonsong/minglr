import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import Approach from "../containers/Approach";
import Greet from "../containers/Greet";

class Home extends React.Component {

  handleClick = async () => {
    await axios.delete('/api/v1/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  render() {
    const { isLoading, loggedInStatus } = this.props;
    return (
        <div className="App">
          { isLoading? "Loading..." :
            <div>
            { 
              loggedInStatus ? 
              <div>
                <nav>
                  <img src={require("../images/logo.png")} alt="logo"/>
                  <div>
                    <a href="main.zoom.link">Go Back to Conference</a>
                    <Link to='/logout' onClick={this.handleClick}>Log Out</Link> 
                  </div>
                </nav>
                <main>
                  <Approach/>
                  <Greet />
                </main>
              </div>
              : 
              <div>
                <Link to='/login'>Log In</Link><br></br>
                <Link to='/signup'>Sign Up</Link>
              </div>
            }
            </div>
          }
        </div>
  )};
}

export default Home;
