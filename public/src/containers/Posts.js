import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestReadingPosts } from '../actions/util';
import Posts from '../components/Posts';

const mapToState = state => ({
    posts: state.reading
})

const mapToDispatch = dispatch => ({
    request: () => dispatch(requestReadingPosts())
})

const container = props => (
    <Posts {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))