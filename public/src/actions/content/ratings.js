import {
    secured_submit
} from '../util'
import {
    receivePostRating
} from '../data'

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