import React from 'react';
import axios from "axios";
import Approach from "./containers/Approach";
import Greet from "./containers/Greet";

class App extends React.Component {

  state = {
    users: [],
    isLoading: true
  }

  getUsers = async () => {
    const { data } = await axios.get('/api/v1/users')
    console.log(data)
    this.setState({ 
      users: data,
      isLoading: false
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, isLoading } = this.state;
    return (<div className="App">
      <header className="App-header">
        {isLoading ? "Loading..." : (
          <div>
            <Approach users={users}/>
            <Greet users={users}/>
          </div>
        )}
      </header>
    </div>
  )};
}

export default App;
