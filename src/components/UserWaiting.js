import React from 'react';
import axios from 'axios'

class UserWaiting extends React.Component{
    constructor(props) {
      super(props);
      this.state = { 
        waited_by: true
       };
    }

    updateWait = async (id, link) => {
        if (this.state.waited_by) {
            await axios.delete('/api/v1/waits/' + id )
            this.setState({
                waited_by: false
            })
            var win = window.open(link, '_blank');
            win.focus();
        }
    };
    render() {
        const { waited_by } = this.state;
        const { id, firstName, lastName, affiliation, image, link } = this.props;
        return (
            <div onClick={() => this.updateWait(id, link)} className={waited_by ? "user" : "user invisible"}>
                <div className="user_image">
                    <img src={(image) ? image : require("../images/default_user.jpeg")} alt={firstName} />
                </div>
                <div className="user_info">
                    <strong>{firstName} {lastName}</strong>
                    <span>{affiliation}</span>
                    <span className="badge">click to talk</span>
                </div>
            </div>
    )};
}

export default UserWaiting;