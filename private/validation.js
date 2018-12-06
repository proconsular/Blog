const jwt = require('jsonwebtoken')
const config = require('./config')
const { Status } = require('./models')

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        Status.findOne({where: {token: token}}).then(status => {
            if (status.state == "LOGGED_IN") {
                jwt.verify(token, config.secret, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({'error': true, 'message': 'Unauthorized access.'})
                    }
                    req.decoded = decoded
                    next()
                })
            } else {
                return res.status(401).json({'error': true, 'message': 'Unauthorized access.'})
            }
        }).catch(error => {
            return res.status(401).json({'error': true, 'message': 'Unauthorized access.'})
        })
    } else {
        return res.status(403).send({
            'error': true,
            'message': 'No token provided.'
        })
    }
}