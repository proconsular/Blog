import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Blog from '../components/Blog';
import { requestBlog } from '../actions';

const mapToState = state => ({
    posts: state.blog.posts
})

const mapToDispatch = dispatch => ({
    request: userId => dispatch(requestBlog(userId))
})

const container = props => (
    <Blog {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))