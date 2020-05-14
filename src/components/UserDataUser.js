import React from 'react';
import axios from 'axios'

class UserDataUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        waiting_for: this.props.user.waiting_for
       };
    }

    
    render() {
        const { waiting_for } = this.state;
        const { id, first_name, last_name, affiliation, image, me } = this.props.user;

        const isWaitingFor = waiting_for ? 'waiting_for' : '';
        const isMe = me ? 'me' : '';
        const isWaiting = waiting_for ? "waiting..." : "wait";

        return (
            <div onClick={() => this.updateWait(this.props.user)} className={`user ${isMe} ${isWaitingFor}`}>
                <div className="user_image">
                    <img src={(image) ? image : require("../images/default_user.jpeg")} alt={first_name} />
                </div>
                <div className="user_info">
                    <strong>{first_name} {last_name} {me? "(you)" : ""}</strong>
                    <span>{affiliation}</span>
                    <span className="badge">{me ? "" : isWaiting}</span>
                </div>
            </div>
    )};
}

export default UserDataUser;