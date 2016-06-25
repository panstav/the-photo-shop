const level = require('./level');
const mongo = require('./mongo');

const isHeroku = require('@panstav/is-heroku');

module.exports = isHeroku() ? mongo() : level();