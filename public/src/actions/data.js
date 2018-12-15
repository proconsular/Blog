import { 
    RECEIVE_READING_POSTS, 
    RECEIVE_POST, 
    RECEIVE_COMMENTS_FOR_POST,
    SIGNAL_COMMENT_SUBMITTED,
    RECEIVE_POST_RATING,
    RECEIVE_TOP_POSTS,
    RECEIVE_SEARCH,
    CHANGE_POST_MODE,
    DELETE_POST,
    RECEIVE_TOKEN,
    POST_SUBMITTED,
    RECEIVE_BLOG,
    RECEIVE_USER,
    RECEIVE_FIELD_USAGE,
    RECEIVE_LOGIN_STATUS,
    LOAD_SESSION_STATE,
    LOGOUT_USER
} from "./types";

export const receiveReadingPosts = posts => ({
    type: RECEIVE_READING_POSTS,
    posts: posts
})

export const receivePost = post => ({
    type: RECEIVE_POST,
    post: post
})

export const receiveCommentsForPost = (postId, comments) => ({
    type: RECEIVE_COMMENTS_FOR_POST,
    id: postId,
    comments: comments
})

export const signalCommentSubmitted = signal => ({
    type: SIGNAL_COMMENT_SUBMITTED,
    signal: signal
})

export const receivePostRating = rating => ({
    type: RECEIVE_POST_RATING,
    rating: rating
})

export const receiveTopPosts = posts => ({
    type: RECEIVE_TOP_POSTS,
    posts: posts
})

export const receiveSearch = posts => ({
    type: RECEIVE_SEARCH,
    posts: posts
})

export const changePostMode = mode => ({
    type: CHANGE_POST_MODE,
    mode: mode
})

export const removePost = id => ({
    type: DELETE_POST,
    id: id
})

export const receiveToken = token => ({
    type: RECEIVE_TOKEN,
    token: token
})

export const signalPostSubmitted = signal => ({
    type: POST_SUBMITTED,
    signal: signal
})

export const receiveBlog = (id, posts) => ({
    type: RECEIVE_BLOG,
    id: id,
    posts: posts
})

export const receiveUser = data => ({
    type: RECEIVE_USER,
    user: data
})

export const receive_field_usage = (field, usage) => ({
    type: RECEIVE_FIELD_USAGE,
    field: field,
    usage: usage
})

export const receiveLoginStatus = data => ({
    type: RECEIVE_LOGIN_STATUS,
    data: data
})

export const loadSessionState = () => ({
    type: LOAD_SESSION_STATE,
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})
