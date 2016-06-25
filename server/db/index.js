const level = require('./level');
const mongo = require('./mongo');

module.exports = process.env.HEROKU ? mongo() : level();