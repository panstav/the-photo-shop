const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

const entryModel = mongoose.model('user', mongoose.Schema({
	firstname: String,
	lastname: String,
	country: String,
	email: String
}));

module.exports = initAndSetMethods;

function initAndSetMethods(){
	mongoose.connect(process.env.MONGODB_URI);

	return { saveEntry, getFeed };
}

function saveEntry(data){
	return entryModel.create(data);
}

function getFeed(){
	return entryModel.find({}).cursor();
}