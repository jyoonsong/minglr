import React from "react";
import UserWaiting from "../components/UserWaiting";
import axios from 'axios'

class Greet extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
          isLoading: true,
          users: []
        };
        this.getUsers = this.getUsers.bind(this)
    }
    getUsers = async () => {
      const { data } = await axios.get('/api/v1/waited_by_users')
      this.setState({ 
        isLoading: false,
        users: data.waited_by_users
      })
    }

    renderUsers = (user) => {
        return <UserWaiting 
                    key={user.id} 
                    id={user.id}
                    firstName={user.first_name} 
                    lastName={user.last_name} 
                    affiliation={user.affiliation}
                    image={user.image}
                    link={user.link}
                    getUsers={this.getUsers}
                    />
    }
    componentDidMount() {
      this.getUsers();
    }
    render () {
        const { users, isLoading } = this.state;
        return (
            <div className="greet">
                {isLoading ? "Loading..." : (
                <div className="container">
                    <div className="user_list">
                        <h2>People who want to talk to you...</h2>
                        <h4></h4>
                        {
                            users.length <= 0 ? "No one yet.":
                            users.map(this.renderUsers)
                        }
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default Greet;