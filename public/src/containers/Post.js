import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Post from '../components/Post';
import { requestPost, requestComments, submitRating, requestRatingOfPost, deletePost, requestReadingPosts } from '../actions/util';
import { changePostMode } from '../actions/data';

const mapToState = state => ({
    posts: state.posts,
    comments: state.comments,
    user: state.session.user,
    ratings: state.ratings
})

const mapToDispatch = dispatch => ({
    request: id => dispatch(requestPost(id)()),
    requestComments: id => dispatch(requestComments(id)),
    rate: (rating, callback) => dispatch(submitRating(rating, callback)),
    requestRating: (userId, postId) => dispatch(requestRatingOfPost(userId, postId)),
    setMode: mode => dispatch(changePostMode(mode)),
    remove: (id, callback) => dispatch(deletePost(id, callback)),
    refresh: () => dispatch(requestReadingPosts())
})

const container = props => (
    <Post {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))