import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PasswordForm from '../components/PasswordForm';
import { submitPasswordChange } from '../actions/util';

const mapToState = state => ({
    user: state.session.user
})

const mapToDispatch = dispatch => ({
    submit: (data, callback) => dispatch(submitPasswordChange(data, callback))
})

const container = props => (
    <PasswordForm {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))