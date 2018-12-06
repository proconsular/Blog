import React from 'react'
import Register from '../containers/Register';
import Login from '../containers/Login';

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