const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let ProductSchema = new Schema({
    categoryId: {type: ObjectId, required: true},
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);