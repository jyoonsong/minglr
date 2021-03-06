import React from 'react';
import axios from 'axios'

class UserWaiting extends React.Component{
    constructor(props) {
      super(props);
      this.state = { 
        waited_by: true
       };
    }

    updateWait = async (id) => {
        if (this.state.waited_by) {
            await axios.delete('/api/v1/match/' + id)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        waited_by: false
                    })
                    const text = response.data.success;
                    this.props.showModal(text)
                    localStorage.setItem("text", text);
                    console.log(localStorage.getItem("text"))
                }
                else {
                    alert(response.data.error)
                }
            })
        }
    };
    render() {
        const { waited_by } = this.state;
        const { id, firstName, lastName, affiliation, image } = this.props;
        return (
            <div onClick={() => this.updateWait(id)} className={waited_by ? "user" : "user invisible"}>
                <div className="user_image">
                    <img src={(image) ? image : require("../images/default_user.jpeg")} alt={firstName} />
                </div>
                <div className="user_info">
                    <strong>{firstName} {lastName}</strong>
                    <span>{affiliation}</span>
                </div>
            </div>
    )};
}

export default UserWaiting;