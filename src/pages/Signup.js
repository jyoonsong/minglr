import React, { Component } from 'react';
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: " ", password: " ", first_name: " ", last_name: " ", affiliation: " ", link: " ", image: " "
     };
  }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
        [name]: value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const {email, password, first_name, last_name, affiliation, link, image} = this.state
        let user = {
            email, password, first_name, last_name, affiliation, link, image
        }
    axios.post('/api/v1/users', {user}, {withCredentials: true})
        .then(response => {
        if (response.data.status === 'created') {
            this.props.handleLogin(response.data)
            this.redirect()
        } else {
            this.setState({
            errors: response.data.errors
            })
        }
        })
        .catch(error => console.log('api errors:', error))
    };
    redirect = () => {
        this.props.history.push('/')
    }
    handleErrors = () => {
        return (
        <div>
            <ul>{this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
            })}
            </ul> 
        </div>
        )
    }
    render() {
        const {email, password, first_name, last_name, affiliation, link, image} = this.state
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                />
                <input
                    placeholder="first name"
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={this.handleChange}
                />
                <input
                    placeholder="last name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={this.handleChange}
                />
                <input
                    placeholder="affiliation"
                    type="text"
                    name="affiliation"
                    value={affiliation}
                    onChange={this.handleChange}
                />
                <input
                    placeholder="link"
                    type="text"
                    name="link"
                    value={link}
                    onChange={this.handleChange}
                />
                <input
                    placeholder="image"
                    type="text"
                    name="image"
                    value={image}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                />
                
                <button placeholder="submit" type="submit">
                    Sign Up
                </button>
            
                </form>
            </div>
        );
    }
}
export default Signup;