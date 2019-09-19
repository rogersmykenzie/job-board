import React from "react";
//packages
import axios from "axios";
//routing
import {Redirect} from "react-router-dom";
//redux
import {connect} from "react-redux";
import {updateUser} from "../redux/reducers/userReducer";

class LoginAndRegister extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            isEmployer: null,
            clickedRegister: false,
            triedToClick: false,
            shouldRedirect: false,
            serverErrorMessage: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]:  e.target.value
        })
    }

    handleRegisterClick = () => {
        const {username, password, email, firstName, lastName, isEmployer} = this.state;
        if(username !== "" && password !== "" && email !== "" && firstName !== "" && lastName !== "" && isEmployer !== null) {
            axios.post("/auth/register", {
                username, password, email, firstName, lastName, isEmployer
            }).then(response => {
                this.props.updateUser({username, email, firstName, lastName, isEmployer});
                this.setState({shouldRedirect: true});
            }).catch(error => {
                this.setState({serverErrorMessage: error.response.data.error});
            })
        } else {
            this.setState({triedToClick: true})
        }
    }

    handleLoginClick = e => {
        const {username, password} = this.state;
        if(username === "" && password === "") {
            this.setState({triedToClick: true});
        } else {
            axios.post("/auth/login", {
                username, password
            }).then(response => {
                console.log(response.data.isEmployer);
                this.props.updateUser(response.data);
                this.setState({shouldRedirect: true, isEmployer: response.data.isEmployer})
            }).catch(err => {
                this.setState({serverErrorMessage: err.response.data.error});
            })
        }
    }

    render() {
        if(this.state.shouldRedirect === true && this.state.isEmployer === false) {
            return <Redirect to="/user" />
        } else if(this.state.shouldRedirect === true && this.state.isEmployer === true) {
            return <Redirect to="/employer" />
        }
        return (
            <>
                <div>
                    {this.state.triedToClick === true ? <h1>Please Fill in all the Fields</h1> : null}
                    {this.state.serverErrorMessage !== "" ? <h1>{this.state.serverErrorMessage}</h1> : null}
                    <input 
                    placeholder="Username" 
                    name="username"
                    onChange={this.handleChange}
                    />
                    <input
                    placeholder="Password"
                    type="password" 
                    name="password"
                    onChange={this.handleChange}
                    />
                </div>
                <button
                onClick={this.handleLoginClick}
                >Login</button>
                <button
                onClick={() => this.setState({clickedRegister: !this.state.clickedRegister})}
                >
                    {this.state.clickedRegister === true ? "Cancel" : "Register"}
                </button>
                {
                    this.state.clickedRegister === true ?
                    <>
                        <input 
                        placeholder="First Name"
                        name="firstName"
                        onChange={this.handleChange} 
                        />
                        <input 
                        placeholder="Last Name" 
                        name="lastName"
                        onChange={this.handleChange}
                        />
                        <input 
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange} />
                        <div>
                            <input
                            type="radio"
                            value="Employer"
                            name="userType"
                            onClick={() => this.setState({isEmployer: true})}
                            />
                            <h6>Employer</h6>
                            <input
                            type="radio"
                            value="Job Seeker"
                            name="userType"
                            onClick={() => this.setState({isEmployer: false})}
                            />
                            <h6>Job Seeker</h6>
                        </div>
                        <button
                        onClick={this.handleRegisterClick}
                        >Sign Up!</button>
                    </>
                    :
                    null
                }
                
            </>
        )
    }
}

export default connect(undefined, {
    updateUser //A connected copy of this function is placed on props - use that one
} )(LoginAndRegister);