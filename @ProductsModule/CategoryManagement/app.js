//const assert = require('assert');
const env = require('node-env-file');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
let port = 1234;

env(__dirname + '/.env');

const category = require('./routes/category.route'); // Imports routes for the categories
const categoryadmin = require('./routes/categoryadmin.route'); // Imports admin routes for the categories

//MONGOOSE CONNECTION
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongooseconfig = {
	useNewUrlParser : true
};

let mongoDB = process.env.MONGODB_BLUETECH_URI || process.env.MONGODB_BLUETECH_DEV_URI;
mongoose.connect(mongoDB, mongooseconfig);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//END MONGOOSE CONNECTION

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/categories', category);
app.use('/categoriesadmin', categoryadmin);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});