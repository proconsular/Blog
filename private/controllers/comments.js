const { Comment } = require('../models')

const get = (req, res) => {
    Comment.findAll().then(comments => {
        res.json(comments)
    }).catch(err => {
        res.json(err)
    })
}

const getOne = (req, res) => {
    Comment.findOne({where: {id: req.params.id}}).then(comment => {
        res.json(comment)
    }).catch(err => {
        res.json(err)
    })
}

const create = (req, res) => {
    Comment.create(req.body).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const update = (req, res) => {
    Comment.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const remove = (req, res) => {
    Comment.destroy({where: {id: req.params.id}}).then(() => {
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