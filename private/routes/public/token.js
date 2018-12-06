const validator = require('../../controllers/token')

module.exports = router => {
    router.post('/token', validator.getNewToken)
}
