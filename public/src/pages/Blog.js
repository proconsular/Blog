import React from 'react'
import Post from '../containers/Post';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestBlog } from '../actions';

class Blog extends React.Component {
    componentWillMount() {
        this.props.request(this.props.match.params.id)
    }

    render() {
        return (
            <div className="posts">
                {this.props.posts.map(post => {
                    return <Post {...post} />
                })}
            </div>
        )
    }
}

const mapToState = state => ({
    posts: state.blog.posts
})

const mapToDispatch = dispatch => ({
    request: id => dispatch(requestBlog(id))
})

const container = props => (
    <Blog {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))