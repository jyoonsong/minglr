import React from 'react';
import { userInfo } from 'os';

class User extends React.Component{
    state = {
      waiting_for: true
    }

    updateWait = () => {
        if (this.state.waiting_for) {
            this.setState({
                waiting_for: false
            })
        }
        else {
            this.setState({
                waiting_for: true
            })
        }
    };
  
    constructor(props) {
        super(props)
        console.log("1")
    }
    componentDidMount() {
        console.log("3 component rendered")
    }
    componentDidUpdate() {
        console.log("3 I just updated")
    }
    componentWillUnmount() {
        console.log("Goodbye, I'm gone")
    }
  
    render() {
        const { firstName, lastName, affiliation } = this.props;
        return (
            <div onClick={this.updateWait}>
                <h4>{firstName} {lastName}</h4>
                <p>{affiliation}</p>
            </div>
    )};
}

export default User;