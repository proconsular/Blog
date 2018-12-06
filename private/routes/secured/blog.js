const blog = require('../../controllers/blog')

module.exports = router => {
    router.get('/blogs/:id', blog.getPostsByUser)
}