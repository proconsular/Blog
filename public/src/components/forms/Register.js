import React from 'react'

export default class Register extends React.Component {
    valid = false

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            login: null,
            valid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        if (event.target.name === "username")
            this.props.validate("username", event.target.value)
        if (event.target.name === "email")
            this.props.validate("email", event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        if (this.valid) {
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            this.props.register(user)
            this.setState({
                login: {
                    email: user.email,
                    password: user.password
                }
            })
            this.setState({
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            })
        }
    }

    render() {
        let messages = []

        if (this.props.user.id !== 0 && this.state.login) {
            this.props.login(this.state.login.email, this.state.login.password)
        } 

        if (this.state.username.length > 0) {
            if (this.state.username.length < 3) {
                messages.push("Username must be longer than two characters")
            }
            if (!/^[a-zA-Z0-9_]+$/.exec(this.state.username)) {
                messages.push("Username can only contain alphanumeric characters or underscores.")
            }
            if (this.props.validated.username !== "ok") {
                messages.push("This username is already in use.")
            }
        }

        if (this.state.email.length > 0) {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.exec(this.state.email)) {
                messages.push("Email must be valid.")
            }
            if (this.props.validated.email !== "ok") {
                messages.push("This email is already in use.")
            }
        }
        
        if (this.state.password.length > 0 && this.state.password.length <= 3) {
            messages.push("Password must be longer than three characters.")
        }

        if (this.state.confirm_password.length > 0) {
            if (this.state.password !== this.state.confirm_password) {
                messages.push("Passwords must match.")
            }
        }

        this.valid = messages.length === 0
        if (this.state.username.length === 0)
            this.valid = false
        if (this.state.email.length === 0)
            this.valid = false
        if (this.state.password.length === 0)
            this.valid = false
        if (this.state.confirm_password.length === 0)
            this.valid = false

        let submit = <input type="submit" value="Submit" />
        if (!this.valid)
            submit = <input className="disabled" type="submit" value="Submit" disabled/>

        return (
            <div className="form">
                <div className="title">Register</div>
                <div className="validations">
                    {messages.slice(0, 1).map(message => {
                        return <div className="validation">{message}</div>
                    })}
                </div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Username:</label>
                        <input name="username" type="text" value={this.state.username} />
                    </div>

                    <div className="field">
                        <label>Email:</label>
                        <input name="email" type="email" value={this.state.email} />
                    </div>
                    
                    <div className="field">
                        <label>Password:</label>
                        <input name="password" type="password" value={this.state.password} />
                    </div>

                    <div className="field">
                        <label>Confirm Password:</label>
                        <input name="confirm_password" type="Password" value={this.state.confirm_password} />
                    </div>

                    {submit}
                </form>
            </div>
        )
    }
}