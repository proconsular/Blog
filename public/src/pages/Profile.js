import React from 'react'
import UserInfo from '../containers/UserInfo';
import PasswordForm from '../containers/PasswordForm';

export default class Profile extends React.Component {
    render() {
        return (
            <div className="posts">
                <UserInfo />
                <PasswordForm />
            </div>
        )
    }
}