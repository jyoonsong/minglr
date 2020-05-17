import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import Approach from "../containers/Approach";
import Greet from "../containers/Greet";

class Home extends React.Component {

  constructor(props) {
    super(props);
     this.handleClick = this.handleClick.bind(this)
  }

  handleClick = async () => {
    await axios.delete('/api/v1/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/login')
    })
    .catch(error => console.log(error))
  }


  render() {
    const { isLoading, loggedInStatus, currentUser } = this.props;

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
                    <a href="main.zoom.link" target="_blank">Go Back to Main Room</a>
                    <Link to='/' onClick={this.handleClick}>Log Out</Link> 
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
              {this.props.history.push("/login")}
              </div>
            }
            </div>
          }
        </div>
  )};
}

export default Home;
