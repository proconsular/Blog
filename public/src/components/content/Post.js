import React from 'react'

import { Link } from 'react-router-dom'

import CommentForm from '../../containers/forms/CommentForm';
import Comment from './Comment'

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: {value: 0},
            updated: false
        }
        this.onRate = this.onRate.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentWillMount() {
        this.props.request(this.props.id)
        this.props.requestComments(this.props.id)
        this.props.requestRating(this.props.user.id, this.props.id)
    }

    onRate(value) {
        let next = Object.assign({}, this.state.rating)
        next.value = value
        if (next.value < -1)
            next.value = -1
        if (next.value > 1)
            next.value = 1
        this.setState({rating: next})
        this.props.rate({
            value: next.value,
            updatedAt: next.updatedAt,
            createdAt: next.createdAt,
            userId: this.props.user.id,
            postId: this.props.id
        }, () => {
            this.props.request(this.props.id)
        })   
    }

    edit() {
        this.props.setMode(1)
        this.props.history.push(`/posts/${this.props.id}`)
    }

    delete() {
        if (window.confirm("Are you sure?")) {
            this.props.remove(this.props.id, success => {
                this.props.refresh()
            })
        }
    }

    render() {
        if (this.props.ratings[this.props.id]) {
            let next = this.props.ratings[this.props.id]
            if (!this.state.rating.updatedAt) {
                this.setState({rating: next})
            }
            if (next.updatedAt > this.state.rating.updatedAt){
                this.setState({rating: next})
            }
        }

        let data = null
        if (this.props.posts[this.props.id]) {
            data = this.props.posts[this.props.id]
        }
        let comments = <div></div>
        if (this.props.comments[this.props.id] && typeof(this.props.comments[this.props.id]) === Array) {
            comments = this.props.comments[this.props.id].map(comment => {
                return <Comment key={comment.id} {...comment} />
            })
        }
        let dislikes = 0
        let likes = 0
        if (data) {
            for (let rating of data.ratings) {
                if (rating.value < 0)
                    dislikes += rating.value
                if (rating.value > 0)
                    likes += rating.value
            }
        }
        let total = dislikes + likes
        let rating = this.state.rating.value
        let color = ""
        if (total < 0)
            color = "red"
        if (total > 0)
            color = "green"

        let owned = this.props.user.id === this.props.authorId
        let owned_links = (
            <React.Fragment>
                <li onClick={this.edit}><i className="material-icons">assignment</i></li>
                <li onClick={this.delete}><i className="material-icons">close</i></li>
            </React.Fragment>
        )
        return (
            <div className="post">
                <div className="options">
                    <ul>
                        {owned && owned_links}
                    </ul>
                </div>
                <div className="title"><Link to={`/posts/${this.props.id}`}>{this.props.title}</Link></div>
                <div className="author">
                    by {data && (
                        <Link className="author" to={`/blogs/${data.author.id}`}>{data.author.username}</Link>
                    )}
                </div>
                <div className="content">
                    {this.props.content.split('\n').map(para => {
                        return <p>{para}</p>
                    })}
                </div>
                {/* <div className="tags">
                    {this.props.tags.map(tag => {
                        return <Tag>{tag}</Tag>
                    })}
                </div> */}
                <div className="rating">
                    <div>
                        <button className={rating < 0 ? "red" : "black"} onClick={() => this.onRate(-1)}><i className="material-icons">thumb_down</i></button>
                        <div className={`user_rating ${color}`}>{Math.abs(total)}</div>
                        <button className={rating > 0 ? "green" : "black"} onClick={() => this.onRate(1)}><i className="material-icons">thumb_up</i></button>
                    </div>
                </div>
                <div className="comments">
                    <CommentForm postId={this.props.id} />
                    <div className="comment_section">
                        {comments}
                    </div>
                </div>
            </div>
        )
    }
}