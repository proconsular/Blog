const { User, Status, Post, Comment, Rating, mysql } = require('../models')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const Op = Sequelize.Op

const WORK_FACTOR = 10

const getUserFromStatus = (req, res) => {
    Status.findOne({where: {id: req.params.id}}).then(status => {
        User.findOne({where: {id: status.userId}}).then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err)
        })
    }).catch(err => {
        res.json(err)
    })
}

const getPostsByDesc = async (req, res) => {
    try {
        let posts = await Post.findAll({order: [['createdAt', 'DESC']]})
        res.json(posts)
    } catch (err) {
        res.json(err)
    }
}

const getCommentsForPost = async (req, res) => {
    try {
        let comments = await Comment.findAll({where: {postId: req.params.id}, include: [User], order: [['createdAt', 'DESC']]})
        res.json(comments)
    } catch (err) {
        res.json(err)
    }
}

const getRatingOfPost = async (req, res) => {
    try {
        let rating = await Rating.findOne({where: {userId: req.body.userId, postId: req.body.postId}})
        if (rating) {
            res.json(rating)
        } else {
            throw {error: true, message: "Rating not found."}
        }
    } catch (err) {
        res.json(err)
    }
}

const getPostsByRating = async (req, res) => {
    try {
        let posts = await mysql.query('SELECT * FROM posts JOIN (SELECT postId, SUM(value) as total FROM ratings GROUP BY postId) as votes ON posts.id = votes.postId ORDER BY total DESC', {type: mysql.QueryTypes.SELECT, model: Post})
        res.json(posts)
    } catch (err) {
        res.json(err)
    }
}

const count = (re, str) => {
    return ((str || '').match(re) || []).length
}

const searchPosts = async (req, res) => {
    try {
        let rel = {}
        let words = req.body.phrase.trim().split(' ')
        for (let word of words) {
            let results = await Post.findAll({where: {title: {[Op.regexp]: `.*${word}.*`}}})
            for (let post of results) {
                if (rel[post.id] == undefined) {
                    rel[post.id] = 0
                }
                rel[post.id] += count(new RegExp(word), post.title)
                rel[post.id] += count(new RegExp(req.body.phrase), post.title)
            }
        }
        ids = []
        for (let key in rel) {
            ids.push([key, rel[key]])
        }
        ids.sort((a, b) => {
            return a[1] < b[1]
        })
        for (let i in ids) {
            ids[i] = Number(ids[i][0])
        }
        if (ids.length > 0) {
            let posts = await mysql.query(`SELECT * FROM posts WHERE id IN (${ids}) ORDER BY FIELD(id, ${ids})`, {type: Sequelize.QueryTypes.SELECT, model: Post})
            res.json(posts)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json({error: true})
    }
}

const changeUserPassword = async (req, res) => {
    try {
        let user = await User.findOne({where: {id: req.body.id}})
        bcrypt.compare(req.body.current_password, user.password, (err, match) => {
            if (match) {
                bcrypt.hash(req.body.password, WORK_FACTOR, (err, hash) => {
                    user.password = hash
                    user.save().then(() => {
                        res.json({message: "ok"})
                    })
                })
            } else {
                res.json({error: true})
            }
        })
    } catch (err) {
        res.json(err)
    }
}

module.exports = ({
    getUserFromStatus,
    getPostsByDesc,
    getCommentsForPost,
    getRatingOfPost,
    getPostsByRating,
    searchPosts,
    changeUserPassword
})