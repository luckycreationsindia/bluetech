const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 200, unique : true, dropDups: true},
    password: {type: String, required: true},
    role: {type: String, required: false},
    permissions : {type: String, required: false},
	status: { type : String, default: "Active"},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);