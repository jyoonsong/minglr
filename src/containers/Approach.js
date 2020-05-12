import React from "react";
import User from "../components/User";
import axios from 'axios'

class Approach extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
          isLoading: true,
          users: []
        };
    }
    getUsers = async () => {
      const { data } = await axios.get('/api/v1/users')
      console.log(data)
      this.setState({ 
        isLoading: false,
        users: data.users
      })
    }

    renderUsers = (user) => {
        return <User key={user.id} 
                    id={user.id}
                    firstName={user.first_name} 
                    lastName={user.last_name} 
                    affiliation={user.affiliation}
                    image={user.image}
                    link={user.link}
                    waiting={user.waiting_for}
                    />
    }

    componentDidMount() {
      this.getUsers();
    }
    render() {
        const { users, isLoading } = this.state;
        return(<div>
            {isLoading ? "Loading..." : (
            <div>
                <h3>Approach</h3>
                {users.map(this.renderUsers)}
            </div>
            )}
        </div>)
    }
}

export default Approach;