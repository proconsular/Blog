import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Register from '../../components/forms/Register'
import { registerUser, requestFieldUsage, requestLogin } from '../../actions/auth'

const mapToState = state => ({
    user: state.session.user,
    validated: state.validation
})

const mapToDispatch = dispatch => ({
    register: user => dispatch(registerUser(user)),
    validate: (field, value) => dispatch(requestFieldUsage(field, value)),
    login: (email, password) => dispatch(requestLogin(email, password))
})

const container = props => (
    <Register {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))