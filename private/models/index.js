const Sequelize = require('sequelize')

const mysql = new Sequelize('Blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

const User = mysql.define('user', {
    username: {type: Sequelize.STRING, validate: {
        is: /^[a-zA-Z0-9_]{3,}$/i,
        notEmpty: true
    }},
    email: {type: Sequelize.STRING, validate: {
        isEmail: true,
        notEmpty: true,
    }},
    password: {type: Sequelize.STRING, validate: {
        min: 4,
        notEmpty: true,
    }}
})

const Status = mysql.define('status', {
    state: Sequelize.STRING,
    token: Sequelize.TEXT,
    refresh_token: Sequelize.TEXT
})

const Post = mysql.define('post', {
    title: {type: Sequelize.STRING, validate: {
        min: 3
    }},
    content: {type: Sequelize.TEXT, validate: {
        notEmpty: true,
    }},
})

const Rating = mysql.define('rating', {
    value: {type: Sequelize.INTEGER, defaultValue: 0, validate: {
    }}
})

const Comment = mysql.define('comment', {
    content: {type: Sequelize.TEXT, validate: {
        notEmpty: true,
    }}
})

const Tag = mysql.define('tag', {
    name: {type: Sequelize.STRING, validate: {
        notEmpty: true,
    }}
})

Status.belongsTo(User)
Post.belongsTo(User, {as: 'author'})
Comment.belongsTo(User)
Comment.belongsTo(Post)
Post.hasMany(Tag)

Post.hasMany(Rating)
User.hasMany(Rating)

Rating.sync()
Status.sync()
User.sync()
Post.sync()
Comment.sync()
Tag.sync()

module.exports = ({
    User,
    Status,
    Post,
    Comment,
    Tag,
    Rating,
    mysql
})
