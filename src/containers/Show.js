import React from 'react';
import axios from 'axios';
import UserDataUser from "../components/UserDataUser";

class Show extends React.Component{
    constructor(props) {
      super(props);
      
      this.state = {
        isLoading: true,
        users: []
      }
    }

    getUserData = async (id) => {
        const { data } = await axios.get('api/v1/users/' + id)
        console.log(data)
        this.setState({
            isLoading: false,
            users: data.users
        })
    }

    renderUserData = (user) => {
        return <UserDataUser
                    key={user.id}
                    user={user}
                />
    }

    componentDidMount() {
        const { user } = this.props;
        this.getUserData(user.id);
    }

    render() {
        const { users, isLoading } = this.state;
        const { user, currentUser } = this.props;

        const isNoOne = users.length <= 0 ? "No one yet." : "";

        return (
            <div className="user_data">
                <div className="show">
                    <div className="user_list">
                        <img src={(user.image) ? user.image : require("../images/default_user.jpeg")} alt={user.first_name} />
                        <h3>{user.first_name} {user.last_name}</h3>
                        <p>{user.affiliation}</p>
                        {isLoading ? "Loading..." :(
                            <div>
                                <h4>Waited by...</h4>
                                {users.map(this.renderUserData)}
                                {user.waiting_for ?
                                    <UserDataUser
                                        key={currentUser.id}
                                        user={currentUser}
                                    />
                                    :
                                    isNoOne
                                }
                            </div>
                        )}
                        {user.waiting_for ?
                            <div className="btn" onClick={() => this.props.destroyWait(user)}>Stop Waiting</div>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
    )};
}

export default Show;