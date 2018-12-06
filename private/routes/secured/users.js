const users = require('../../controllers/users')

module.exports = router => {
    router.get('/users', users.get)
    router.get('/users/:id', users.getOne)
    router.post('/users', users.create)
    router.delete('/users/:id', users.remove)
    router.put('/users/:id', users.update)
}
