import React from 'react'

import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        this.props.logout(this.props.user.email)
        this.props.history.push('/')
    }

    render() {
        let email = "undefined"
        if (this.props.user) {
            email = this.props.user.email
        }
        return (
            <div className="navbar">
                <div>
                    <ul>
                        <Link to='/'><li>reading</li></Link>
                        <Link to='/top'><li>top rated</li></Link>
                        <Link to='/explore'><li>explore</li></Link>
                        <Link to='/me'><li>my blog</li></Link>
                    </ul>
                </div>
                <div className="profile">
                    <div><Link to="/profile">{email}</Link></div>
                    <div><button onClick={this.logout}>logout</button></div>
                </div>
            </div>
        )
    }
}