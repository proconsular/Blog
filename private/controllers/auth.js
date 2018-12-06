const { User, Status } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../config')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const WORK_FACTOR = 10

const register = (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    bcrypt.hash(user.password, WORK_FACTOR, (err, hash) => {
        user.password = hash
        User.create(user).then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err)
        })
    })
}

const login = (req, res) => {
    User.findOne({where: {email: req.body.email}}).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
            if (match) {
                user_sig = {email: user.email, password: user.password}
                tokens = createTokens(user_sig)
                Status.find({where: {userId: user.id}}).then(status => {
                    if (status) {
                        status.state = "LOGGED_IN"
                        status.token = tokens.token
                        status.refresh_token = tokens.refresh_token
                        status.save().then(() => {
                            res.json(status)
                        })
                    } else {
                        Status.create({state: "LOGGED_IN", userId: user.id, ...tokens}).then(record => {
                            res.json(record)
                        })
                    }
                })
            } else {
                res.json({state: "Invalid"})
            }
        })
    }).catch(err => {
        res.json({state: "Invalid"})
    })
}

const logout = (req, res) => {
    User.findOne({where: {email: req.body.email}}).then(user => {
        Status.findOne({where: {userId: user.id}}).then(status => {
            status.state = "LOGGED_OUT"
            status.save().then(() => {
                res.json({message: "ok"})
            })
        }).catch(err => {
            res.json(err)
        })
    }).catch(err => {
        res.json(err)
    })
}

const createTokens = user => {
    const token = jwt.sign(user, config.secret, {expiresIn: config.tokenLife})
    const refresh_token = jwt.sign(user, config.refreshTokenSecret)
    return ({ token, refresh_token })
}

const isValid = (req, res) => {
    User.findAll({where: {[req.body.field]: {[Op.eq]: req.body.value}}}).then(users => {
        if (users && users.length > 0) {
            res.json({message: "In use.", field: req.body.field, value: req.body.value})
        } else {
            res.json({message: "ok"})
        }
    }).catch(err => {
        res.json(err)
    })
}

module.exports = ({
    register,
    login,
    logout,
    isValid
})
