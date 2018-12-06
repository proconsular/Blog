const jwt = require('jsonwebtoken')
const { Status, User } = require('../models')
const config = require('../config')

const getNewToken = (req, res) => {
    const data = req.body
    if (data.refresh_token) {
        Status.findOne({where: {refresh_token: data.refresh_token}}).then(record => {
            if (record) {
                if (record.state == "LOGGED_IN") {
                    User.findOne({where: {id: record.userId}}).then(user_record => {
                        const user = {
                            'email': user_record.email,
                            'password': user_record.password
                        }
                        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
                        record.token = token
                        record.save().then(data => {
                            res.json({'token': token})
                        })
                    })
                } else {
                    res.json({error: true, message: 'Unauthorized access.'})
                }
            }
        })
    } else {
        res.status(404).send('Invalid request.')
    }
}

module.exports = ({
    getNewToken
})