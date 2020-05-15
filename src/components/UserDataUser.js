import React from 'react';

class UserDataUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        waiting_for: this.props.user.waiting_for
       };
    }

    
    render() {
        const { waiting_for } = this.state;
        const { first_name, last_name, affiliation, image, me } = this.props.user;

        const isWaitingFor = waiting_for ? 'waiting_for' : '';
        const isMe = me ? 'me' : '';
        const isWaiting = waiting_for ? "waiting..." : "";

        return (
            <div className={`no-hover user ${isMe} ${isWaitingFor}`}>
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