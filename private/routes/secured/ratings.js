const ratings = require('../../controllers/ratings')

module.exports = router => {
    router.get('/ratings', ratings.get)
    router.get('/ratings/:id', ratings.getOne)
    router.post('/ratings', ratings.create)
    router.put('/ratings/:id', ratings.update)
    router.delete('/ratings/:id', ratings.remove)
    router.put('/ratings/', ratings.rate)
}
