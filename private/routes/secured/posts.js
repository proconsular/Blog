const posts = require('../../controllers/posts')

module.exports = router => {
    router.get('/posts', posts.get)
    router.get('/posts/:id', posts.getOne)
    router.post('/posts', posts.create)
    router.put('/posts/:id', posts.update)
    router.delete('/posts/:id', posts.remove)
}
