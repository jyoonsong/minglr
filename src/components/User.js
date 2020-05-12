import React from 'react';
import axios from 'axios'

class User extends React.Component{
    constructor(props) {
      super(props);
      this.state = { 
        waiting_for: this.props.waiting
       };
    }

    updateWait = async (id) => {
        if (this.state.waiting_for) {
            await axios.delete('/api/v1/waits/' + id )
            this.setState({
                waiting_for: false
            })
        }
        else {
            await axios.post('/api/v1/waits/' + id)
            this.setState({
                waiting_for: true
            })
        }
    };
    render() {
        const { waiting_for } = this.state;
        const { id, firstName, lastName, affiliation, image, link } = this.props;
        return (
            <div onClick={() => this.updateWait(id)} className={waiting_for ? "red" : ""}>
                <img src={!(image) ? "default.jpg" : ""} alt={firstName} />
                <h4>{firstName} {lastName}</h4>
                <p>{affiliation}</p>
                <p>{waiting_for ? "waiting..." : "wait"}</p>
            </div>
    )};
}

export default User;