const auth = require('../../controllers/auth')

module.exports = router => {
    router.post('/login', auth.login)
    router.post('/register', auth.register)
    router.post('/logout', auth.logout)
    router.post('/valid', auth.isValid)
}
