const tags = require('../../controllers/tags')

module.exports = router => {
    router.get('/tags', tags.get)
    router.get('/tags/:id', tags.getOne)
    router.post('/tags', tags.create)
    router.delete('/tags/:id', tags.remove)
    router.put('/tags/:id', tags.update)
}
