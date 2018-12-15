import { 
    secured_submit, 
    secured_request 
} from './util'
import { 
    receiveSearch, 
    receiveReadingPosts, 
    receiveTopPosts,
    receiveBlog
} from './data'
import {
    AUTH_ACTION,
} from './types'

export const requestSearch = phrase => {
    return secured_submit((dispatch, data) => {
        dispatch(receiveSearch(data))
    }, ({ phrase }), '/api/search')()
}

export const requestReadingPosts = secured_request((dispatch, data) => {
    dispatch(receiveReadingPosts(data))
}, '/api/util/posts')

export const requestTopPosts = () => {
    return secured_request((dispatch, data) => {
        dispatch(receiveTopPosts(data))
    }, '/api/top')()
}

export const requestBlog = userId => ({
    type: AUTH_ACTION,
    action: token => {
        return dispatch => {
            fetch(`/api/blogs/${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveBlog(userId, json))
            })
        }
    }
})
