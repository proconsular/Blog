const { Rating } = require('../models')

const get = (req, res) => {
    Rating.findAll().then(posts => {
        res.json(posts)
    }).catch(err => {
        res.json(err)
    })
}

const getOne = (req, res) => {
    Rating.findOne({where: {id: req.params.id}}).then(post => {
        res.json(post)
    }).catch(err => {
        res.json(err)
    })
}

const create = (req, res) => {
    Rating.create(req.body).then(() => {
        res.json({message: "ok"})
    }).catch(err => {
        res.json(err)
    })
}

const update = async (req, res) => {
    try {
        await Rating.update(req.body)
        res.json({message: "ok"})
    } catch (err) {
        res.json(err)
    }
}

const rate = async (req, res) => {
    try {
        let rating = await Rating.findOne({where: {userId: req.body.userId, postId: req.body.postId}})
        if (rating) {
            rating.value = req.body.value
            await rating.save()
            res.json({message: "ok"})
        } else {
            await Rating.create(req.body)
            res.json({message: "ok"})
        }
    } catch (err) {
        res.json(err)
    }
}

const remove = (req, res) => {
    Rating.destroy({where: {id: req.params.id}}).then(() => {
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
    remove,
    rate
})