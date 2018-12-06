import React from 'react'

export default class PasswordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_password: '',
            password: '',
            confirm_password: '',
            status: {received: false, success: false}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        if (this.state.password === this.state.confirm_password) {
            this.props.submit({
                id: this.props.user.id,
                current_password: this.state.current_password,
                password: this.state.password
            }, success => {
                this.setState({
                    status: {
                        received: true,
                        success: success
                    }
                })
                this.setState({
                    current_password: '',
                    password: '',
                    confirm_password: ''
                })
                setTimeout(() => {
                    this.setState({
                        status: {
                            received: false,
                            success: false
                        }
                    })
                }, 2000)
            })
        }
    }
    
    render() {
        let valid = true
        let messages = []

        if (this.state.password.length > 0) {
            if (this.state.password.length <= 3) {
                messages.push("Password must be longer than 3 characters.")
            }
            if (this.state.confirm_password.length > 0) {
                if (this.state.password !== this.state.confirm_password) {
                    messages.push("Passwords must match.")
                }
            }
        }

        if (this.state.current_password == 0) {
            valid = false
        }
        if (this.state.password.length == 0) {
            valid = false
        }
        if (messages.length > 0) {
            valid = false
        }

        let submit = <input type="submit" value="Update" />
        if (!valid) {
            submit = <input type="submit" value="Update" disabled/>
        }

        if (this.state.status.received) {
            if (this.state.status.success) {
                messages.push("You've successfully changed your password.")
            } else {
                messages.push("Invalid Password.")
            }
        }

        return (
            <div className="form bordered_panel">
                <div className="validations">
                    {messages.map(message => {
                        return <div className="validation">{message}</div>
                    })}
                </div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Current Password:</label>
                        <input name="current_password" type="password" value={this.state.current_password} />
                    </div>
                    <div className="field">
                        <label>New Password:</label>
                        <input name="password" type="password" value={this.state.password} />
                    </div>
                    <div className="field">
                        <label>Confirm Password:</label>
                        <input name="confirm_password" type="password" value={this.state.confirm_password} />
                    </div>
                    {submit}
                </form>
            </div>
        )
    }
}