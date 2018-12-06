const { Post, Rating } = require('../models')

const get = (req, res) => {
    Post.findAll().then(posts => {
        res.json(posts)
    }).catch(err => {
        res.json(err)
    })
}

const getOne = (req, res) => {
    Post.findOne({where: {id: req.params.id}, include: [{all: true}]}).then(post => {
        res.json(post)
    }).catch(err => {
        res.json(err)
    })
}

const create = (req, res) => {
    Post.create(req.body).then(post => {
        Rating.create({value: 0, userId: post.authorId, postId: post.id}).then(() => {
            res.json({message: "ok"})
        })
    }).catch(err => {
        res.json(err)
    })
}

const update = (req, res) => {
    Post.update(req.body, {where: {id: req.body.id}}).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const remove = (req, res) => {
    Post.destroy({where: {id: req.params.id}}).then(() => {
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