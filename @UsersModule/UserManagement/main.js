const user = require('./routes/user.route'); // Imports routes for the users

let getuserprofile = function getUserProfile(token) {
    let result = {status : "Failure", message : "Invalid Token"};
    if (!token) {
        result.message = 'No Token Provided';
        return result;
    }
    jwt.verify(token, process.env.BLUETECH_SECRET, function(err, decoded) {
        if (err) {
            result.message = 'Failed to authenticate token.';
            return result;
        }
        User.findById(decoded.id, function (err, user) {
            if (err) {
                result.message = 'Failed to authenticate token. Invalid User!';
                return result;
            }
            user.password = undefined;
            delete user.password;
            result.status = 'Success';
            result.message = 'Success';
            result.user = user;
            return result;
        });
    });
};

let validatetoken = function validateToken(token) {
    let result = {status : "Failure", message : "Invalid Token"};
    if (!token) {
        result.message = 'No Token Provided';
        return result;
    }
    jwt.verify(token, process.env.BLUETECH_SECRET, function(err, decoded) {
        if (err) {
            result.message = 'Failed to authenticate token.';
            return result;
        }
        User.findById(decoded.id, function (err, user) {
            if (err) {
                result.message = 'Failed to authenticate token. Invalid User!';
                return result;
            }
            result.status = 'Success';
            result.message = 'Success';
            return result;
        });
    });
};

module.exports = user;
module.exports.validateToken = validatetoken;
module.exports.getUserProfile = getuserprofile;