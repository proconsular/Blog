import React from 'react'
import Post from '../containers/Post';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phrase: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.request(this.state.phrase)
    }
    
    render() {
        return (
            <div>
                <div className="form search">
                    <form onChange={this.onChange} onSubmit={this.onSubmit}>
                        <input className="bar" type="text" name="phrase" value={this.state.phrase} />
                        <input className="submit" type="submit" value="Search" />
                    </form>   
                </div>
                <div>
                    {this.props.results.map(post => {
                        return <Post {...post} />
                    })}
                </div>
            </div>
        )
    }
}