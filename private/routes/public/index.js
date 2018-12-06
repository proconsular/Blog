const validator = require('./token')
const auth = require('./auth')

module.exports = router => {
    validator(router)
    auth(router)
}
