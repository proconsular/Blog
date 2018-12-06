import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PostForm from '../components/PostForm';
import { submitPost, signalPostSubmitted } from '../actions';
import { submitRating } from '../actions/util';

const mapToState = state => ({
    signal: state.signals.posted,
    user: state.session.user
})

const mapToDispatch = dispatch => ({
    post: post => dispatch(submitPost(post)),
    reset: () => dispatch(signalPostSubmitted(0)),
    rate: rating => dispatch(submitRating(rating))
})

const container = props => (
    <PostForm {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))