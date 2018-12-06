const users = require('./users')
const posts = require('./posts')
const comments = require('./comments')
const tags = require('./tags')
const util = require('./util')
const blog = require('./blog')
const ratings = require('./ratings')

module.exports = router => {
    users(router)
    posts(router)
    comments(router)
    tags(router)
    util(router)
    blog(router)
    ratings(router)
}
