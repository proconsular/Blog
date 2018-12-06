import React from 'react'
import Post from '../containers/Post'
import { requestReadingPosts } from '../actions/util';

export default class Posts extends React.Component {
    componentWillMount() {
        this.props.request()
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