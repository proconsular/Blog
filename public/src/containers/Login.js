import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from '../components/Login'
import { requestLogin } from '../actions';

const mapToState = state => ({
    status: state.session.state,
    user: state.session.user
})

const mapToDispatch = dispatch => ({
    login: (email, password) => dispatch(requestLogin(email, password))
})

const container = props => (
    <Login {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))