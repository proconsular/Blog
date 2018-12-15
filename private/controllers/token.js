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

const verify = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        if (token) {
            let status = await Status.findOne({where: {token: token}})
            if (status.state == "LOGGED_IN") {
                jwt.verify(token, config.secret, (err, decoded) => {
                    res.json({valid: !err})
                })
            } else {
                throw {}
            }
        } else {
            throw {}
        }
    } catch (err) {
        res.json({valid: false})
    }
}

module.exports = ({
    getNewToken,
    verify
})