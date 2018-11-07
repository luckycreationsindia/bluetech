const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.user_register = function (req, res) {
	let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let user = new User(
        {
            name: req.body.name,
			email: req.body.email,
			password: hashedPassword
        }
    );

    user.save(function (err) {
        if (err) {
			let msg = "Error Adding User!";
			if(err.code === 11000) {
				msg = "Email Already Exist";
			}
			console.error(err);
			res.send(msg);
			return;
        }
		res.send('User Created successfully');
    });
};

exports.user_validate = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) return next(err);
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(result == true) {
				let token = jwt.sign({ id: user._id }, process.env.BLUETECH_SECRET, {
					expiresIn: 86400 // expires in 24 hours
				});
				res.status(200).send({auth: true, token: token});
			} else {
				res.status(500).send({auth: false});
			}
		});
    });
};

exports.user_profile = function (req, res) {
	let token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	jwt.verify(token, process.env.BLUETECH_SECRET, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		User.findById(decoded.id, function (err, user) {
			if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. Invalid User!' });
			user.password = undefined;
			delete user.password;
			res.status(200).send(user);
		});
	});
};