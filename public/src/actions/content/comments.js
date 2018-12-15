import { 
    secured_submit, 
    secured_request 
} from '../util'
import { 
    signalCommentSubmitted, 
    receiveCommentsForPost 
} from '../data'

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
