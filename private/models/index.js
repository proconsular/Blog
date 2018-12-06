const Sequelize = require('sequelize')

const mysql = new Sequelize('Blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

const User = mysql.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

const Status = mysql.define('status', {
    state: Sequelize.STRING,
    token: Sequelize.TEXT,
    refresh_token: Sequelize.TEXT
})

const Post = mysql.define('post', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
})

const Rating = mysql.define('rating', {
    value: Sequelize.INTEGER
})

const Comment = mysql.define('comment', {
    content: Sequelize.TEXT
})

const Tag = mysql.define('tag', {
    name: Sequelize.STRING
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
