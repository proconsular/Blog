const { User } = require('../models')

const get = (req, res) => {
    User.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        res.json(err)
    })
}

const getOne = (req, res) => {
    User.findOne({where: {id: req.params.id}}).then(user => {
        res.json(user)
    }).catch(err => {
        res.json(err)
    })
}

const create = (req, res) => {
    User.create(req.body).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const remove = (req, res) => {
    User.destroy({where: {id: req.params.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const update = (req, res) => {
    User.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

module.exports = ({
    get,
    getOne,
    create,
    remove,
    update
})
