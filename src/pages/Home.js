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
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <nav>
                      { this.props.isLoading? "Loading..." :
                        <div>
                        { 
                          this.props.loggedInStatus ? 
                          <div>
                            <Link to='/logout' onClick={this.handleClick}>Log Out</Link> 
                            <Approach />
                            <Greet />
                          </div>
                          : 
                          <div>
                            <Link to='/login'>Log In</Link><br></br>
                            <Link to='/signup'>Sign Up</Link>
                          </div>
                        }
                        </div>
                      }
                    </nav>
                </div>
            </header>
        </div>
  )};
}

export default Home;
