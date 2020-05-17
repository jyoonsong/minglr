import React from "react";
import UserWaiting from "../components/UserWaiting";
import Modal from "../components/Modal";
import axios from 'axios'

class Greet extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
          isLoading: true,
          users: [],
          text: localStorage.getItem("text") || ""
        };
        this.getUsers = this.getUsers.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    showModal = (text) => {
        this.setState(prevState => ({ 
            ...prevState,
            text: text
        }))
    }

    getUsers = async () => {
      const { data } = await axios.get('/api/v1/greet')
      this.setState(prevState => ({ 
        ...prevState,
        isLoading: false,
        users: data.waited_by_users,
      }))
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
                    showModal={this.showModal}
                    />
    }
    componentDidMount() {
      this.getUsers();
    }
    render () {
        const { users, isLoading, text } = this.state;
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
                {text.length > 0 ? <Modal text={text}/> : <div></div>}
            </div>
        )
    }
}

export default Greet;