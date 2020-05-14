import React from 'react';
import axios from 'axios';

class User extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {
        const { id, first_name, last_name, affiliation, image, waiting_for, me } = this.props.user;
        return (
            <div>
            {me ? "" :
                <div onClick={() => this.props.createWait(this.props.user)} className={waiting_for ? "user grey" : "user"}>
                    <div className="user_image">
                        <img src={(image) ? image : require("../images/default_user.jpeg")} alt={first_name} />
                    </div>
                    <div className="user_info">
                        <strong>{first_name} {last_name}</strong>
                        <span>{affiliation}</span>
                        <span className="badge">{waiting_for ? "waiting..." : "wait"}</span>
                    </div>
                </div>
            }
            </div>
    )};
}

export default User;