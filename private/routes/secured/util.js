const util = require('../../controllers/util')

module.exports = router => {
    router.get('/users/status/:id', util.getUserFromStatus)
    router.get('/util/posts/', util.getPostsByDesc)
    router.get('/comments/post/:id', util.getCommentsForPost)
    router.post('/util/rating', util.getRatingOfPost)
    router.get('/top', util.getPostsByRating)
    router.post('/search', util.searchPosts)
    router.post('/password', util.changeUserPassword)
}
