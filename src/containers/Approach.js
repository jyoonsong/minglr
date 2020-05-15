import React from "react";
import User from "../components/User";
import axios from 'axios'
import Show from '../containers/Show';

class Approach extends React.Component { 
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this)
        this.createWait = this.createWait.bind(this)
        this.destroyWait = this.destroyWait.bind(this)
        this.state = { 
          isLoading: true,
          users: [],
          user: {
              id: -1
          },
          currentUser: {}
        };
    }

    createWait = async (user) => {
        const { users } = this.state;

        // set user shown
        this.handleUpdate(user)

        // create wait
        if (!user.waiting_for) {
            await axios.post('/api/v1/waits/' + user.id)

            const index = users.findIndex(u => u.id === user.id);
            const selected = users[index];
            const nextUsers = [...users];

            nextUsers[index] = { 
                ...selected, 
                waiting_for: !selected.waiting_for
            };
    
            this.setState({
                users: nextUsers,
                user: nextUsers[index]
            });
        }
    }

    destroyWait = async (user) => {
        const { users } = this.state;

        // destroy wait
        if (user.waiting_for) {
            await axios.delete('/api/v1/waits/' + user.id + '/destroy')

            const index = users.findIndex(u => u.id === user.id);
            const selected = users[index];
            const nextUsers = [...users];

            nextUsers[index] = { 
                ...selected, 
                waiting_for: !selected.waiting_for
            };
    
            this.setState({
                users: nextUsers,
                user: nextUsers[index]
            });
        }
    }

    handleUpdate = (user) => {
        console.log(user);
        this.setState({
            user: user
        });
    }

    getUsers = async () => {
      const { data } = await axios.get('/api/v1/users')
      const currentUser = data.users.find(user => user.me === true);
      
      this.setState({ 
        isLoading: false,
        users: data.users,
        currentUser: currentUser
      })
    }

    renderUsers = (user) => {
        return <User key={user.id} 
                    user={user}
                    handleUpdate={this.handleUpdate}
                    createWait={this.createWait}
                    />
    }

    componentDidMount() {
      this.getUsers();
    }
    render() {
        const { user, users, isLoading, currentUser } = this.state;
        return(
        <div className="approach">
            {isLoading ? "Loading..." : (
                <div className="container">
                    <div className="user_list">
                        <h2>I'd like to talk to...</h2>
                        <h4>Search Result</h4>
                        {users.map(this.renderUsers)}
                    </div>
                    {user.id < 0 ? 
                        <div className="user_data"></div>
                        :
                        <Show 
                            user={user} 
                            key={user.id} 
                            createWait={this.createWait}
                            destroyWait={this.destroyWait}
                            currentUser={currentUser}/>
                    }
                </div>
            )}
        </div>)
    }
}

export default Approach;