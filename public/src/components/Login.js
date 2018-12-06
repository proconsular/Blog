import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.login(this.state.email, this.state.password)
    }

    render() {
        let messages = []

        if (this.props.status) {
            if (this.props.status.state !== "Not Requested" && this.props.status.state !== "LOGGED_IN") {
                messages.push("Your email or password are invalid.")
            }
            if (this.props.status.state === "LOGGED_IN" && this.props.user.id !== 0) {
                messages.push("You've successfully logged in.")
            }
        }

        let submit = <input type="submit" value="Submit" />
        return (
            <div className="form">
                <div className="title">Login</div>
                <div className="validations">
                    {messages.slice(0, 1).map(message => {
                        return <div className="validation">{message}</div>
                    })}
                </div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Email:</label>
                        <input name="email" type="email" value={this.state.email} />
                    </div>
                    <div className="field">
                        <label>Password:</label>
                        <input name="password" type="password" value={this.state.password} />
                    </div>
                    {submit}
                </form>
            </div>
        )
    }
}