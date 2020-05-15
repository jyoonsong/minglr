import React from 'react';

class User extends React.Component{

    render() {
        const { first_name, last_name, affiliation, image, waiting_for, me } = this.props.user;
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
                        <span className="badge">{waiting_for ? "waiting..." : ""}</span>
                    </div>
                </div>
            }
            </div>
    )};
}

export default User;