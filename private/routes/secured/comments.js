const comments = require('../../controllers/comments')

module.exports = router => {
    router.get('/comments', comments.get)
    router.get('/comments/:id', comments.getOne)
    router.post('/comments', comments.create)
    router.put('/comments/:id', comments.update)
    router.delete('/comments/:id', comments.remove)
}