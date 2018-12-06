const { Tag } = require('../models')

const get = (req, res) => {
    Tag.findAll().then(tags => {
        res.json(tags)
    }).catch(err => {
        res.json(err)
    })
}

const getOne = (req, res) => {
    Tag.findById(req.params.id).then(tag => {
        res.json(tag)
    }).catch(err => {
        res.json(err)
    })
}

const create = (req, res) => {
    Tag.create(req.body).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const update = (req, res) => {
    Tag.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const remove = (req, res) => {
    Tag.destroy({where: {id: req.params.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

module.exports = ({
    get,
    getOne,
    create,
    update,
    remove
})