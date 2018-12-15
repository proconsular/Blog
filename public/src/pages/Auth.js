import React from 'react'
import Register from '../containers/forms/Register';
import Login from '../containers/forms/Login';

export default class Authenication extends React.Component {
    render() {
        return (
            <div>
                <Register />
                <Login />
            </div>
        )
    }
}