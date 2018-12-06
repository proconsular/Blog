import { receiveReadingPosts, receivePost, receiveCommentsForPost, signalCommentSubmitted, receivePostRating, receiveTopPosts, receiveSearch, removePost, receiveToken } from "./data";
import { AUTH_ACTION } from './index'

const secure = action => ({
    type: AUTH_ACTION,
    action: action
})

const secured_request = (action, route, method='GET') => () => secure(token => {
    return dispatch => {
        fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            action(dispatch, data)
        })
    }
})

const secured_submit = (action, body, route, method='POST') => () => secure(token => {
    return dispatch => {
        fetch(route, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            action(dispatch, data)
        })
    }
})

export const requestReadingPosts = secured_request((dispatch, data) => {
    dispatch(receiveReadingPosts(data))
}, '/api/util/posts')

export const requestPost = id => secured_request((dispatch, data) => {
    dispatch(receivePost(data))
}, `/api/posts/${id}`)

export const submitComment = comment => {
    return secured_submit((dispatch, data) => {
        dispatch(signalCommentSubmitted(data.message === "ok" ? 2 : 1))
    }, comment, '/api/comments/')()
}

export const requestComments = id => {
    return secured_request((dispatch, data) => {
        dispatch(receiveCommentsForPost(id, data))
    }, `/api/comments/post/${id}`)()
}

export const submitRating = (rating, callback=null) => {
    return secured_submit((dispatch, data) => {
        if (callback)
            callback()
    }, rating, '/api/ratings/', 'PUT')()
}

export const requestRatingOfPost = (userId, postId) => {
    return secured_submit((dispatch, data) => {
        dispatch(receivePostRating(data))
    }, ({ userId, postId }), '/api/util/rating')()
}

export const requestTopPosts = () => {
    return secured_request((dispatch, data) => {
        dispatch(receiveTopPosts(data))
    }, '/api/top')()
}

export const requestSearch = phrase => {
    return secured_submit((dispatch, data) => {
        dispatch(receiveSearch(data))
    }, ({ phrase }), '/api/search')()
}

export const submitPasswordChange = (data, callback) => {
    return secured_submit((dispatch, data) => {
        callback(data.message === "ok")
    }, data, '/api/password')()
}

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

export const updateToken = refresh_token => {
    return dispatch => {
        fetch('/auth/token', {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: refresh_token
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveToken(data))
        })
    }
}
