const env = require('node-env-file');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const assert = require('assert');

env(__dirname + '/.env');
assert.equal(process.env.MONGODB_BLUETECH_DEV_URI, "mongodb://127.0.0.1:27017/bluetechdev");

var indexRouter = require('./routes/index'); // Imports routes for the index
var UserManagementRouter = require('bluetechusermanagement/main'); // Imports routes for the users
var CategoryManagementRouter = require('bluetechcategorymanagement/main'); // Imports routes for the categories
var CategoryAdminManagementRouter = require('bluetechcategorymanagement/adminmain'); // Imports admin routes for the categories
var ProductsManagementRouter = require('bluetechproductmanagement/main'); // Imports routes for the products

var app = express();

//MONGOOSE CONNECTION
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongooseconfig = {
    useNewUrlParser : true
};

let mongoDB = process.env.MONGODB_BLUETECH_URI || process.env.MONGODB_BLUETECH_DEV_URI;

console.log(mongoDB);
mongoose.connect(mongoDB, mongooseconfig);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
global.db = mongoose.connection;
global.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//END MONGOOSE CONNECTION

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bluetechtemplatepreview', express.static(path.join(__dirname, 'public_template')));
app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.get('*.ejs', function(req, res) {
    res.render(__dirname + '/public' + req.url, function(err, result) {
        res.end(result);
    });
});

function adminMiddleWare (req, res, next) {
    let result = UserManagementRouter.getUserProfile(req.headers['x-access-token']);
    if(result.status === "Success") {
        next();
    } else {
        res.status(401).json(result);
    }
}

app.use('/admin', adminMiddleWare);
app.use('/', indexRouter);
app.use('/users', UserManagementRouter);
app.use('/categories', CategoryManagementRouter);
app.use('/admin/categories', CategoryAdminManagementRouter);
app.use('/products', ProductsManagementRouter);

module.exports = app;
