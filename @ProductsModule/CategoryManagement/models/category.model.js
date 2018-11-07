const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let CategorySchema = new Schema({
    id: {type: ObjectId},
    parentCategoryId: {type: ObjectId},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
});

CategorySchema.plugin(mongoosePaginate);

// Export the model
module.exports = mongoose.model('Category', CategorySchema);