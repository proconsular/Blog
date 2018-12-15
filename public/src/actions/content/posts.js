import { 
    secured_request,
    secured_submit
} from '../util'
import {
    receivePost,
    removePost,
    signalPostSubmitted
} from '../data'
import {
    AUTH_ACTION,
} from '../types'

export const submitPost = post => ({
    type: AUTH_ACTION,
    action: token => {
        return dispatch => {
            fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(signalPostSubmitted(json.message === "ok" ? 2 : 1))
            })
        }
    }
})

export const requestPost = id => secured_request((dispatch, data) => {
    dispatch(receivePost(data))
}, `/api/posts/${id}`)

export const updatePost = (post, callback) => {
    return secured_submit((dispatch, data) => {
        callback(data.message === "ok")
    }, post, `/api/posts/${post.id}`, 'PUT')()
}

export const deletePost = (id, callback) => {
    return secured_submit((dispatch, data) => {
        dispatch(removePost(id))
        callback(data.message === "ok")
    }, {}, `/api/posts/${id}`, 'DELETE')()
}
