import React from 'react'

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.post({
            ...this.state,
            userId: this.props.user.id,
            postId: this.props.postId 
        })
        this.setState({
            content: ''
        })
    }

    render() {
        if (this.props.signal === 2) {
            this.props.request(this.props.postId)
            setTimeout(() => {
                this.props.reset()
            }, 100)
        }
        return (
            <div className="form comment_form">
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <textarea name="content" value={this.state.content}></textarea>
                    <input type="submit" value="Reply" />
                </form>
            </div>
        )
    }
}