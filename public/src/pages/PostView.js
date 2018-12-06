import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from '../containers/Post';
import { requestPost } from '../actions/util';
import PostEditForm from '../containers/PostEditForm';

class PostView extends React.Component {
    componentWillMount() {
        this.props.request(this.props.match.params.id)
    }

    render() {
        let post = <div></div>
        let id = this.props.match.params.id
        if (this.props.posts[id]) {
            let mode = this.props.mode
            if (mode === 0) {
                post = <Post {...this.props.posts[id]} />
            } else if (mode === 1) {
                post = <PostEditForm post={this.props.posts[id]} />
            }
        }
        return (
            <div className="posts">
                {post}
            </div>
        )
    }
}

const mapToState = state => ({
    posts: state.posts,
    mode: state.view.mode
})

const mapToDispatch = dispatch => ({
    request: id => dispatch(requestPost(id)())
})

const container = props => (
    <PostView {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))