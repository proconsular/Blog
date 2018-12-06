const { Post } = require('../models')

const getPostsByUser = (req, res) => {
    Post.findAll({where: {authorId: req.params.id}, order: [['createdAt', 'DESC']]}).then(posts => {
        res.json(posts)
    }).catch(err => {
        res.json(err)
    })
}

module.exports = ({
    getPostsByUser
})