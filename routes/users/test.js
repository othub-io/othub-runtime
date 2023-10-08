require('dotenv').config()
var express = require('express')
var router = express.Router()
const web3passport = require('../../auth/passport');
// Test authenticated route
// Use this route to test if the front-end is able to access this route 
// Front-end needs to pass the token in the request header (header name: "Authorization")
router.get('/', web3passport.authenticate('jwt', { session: false }),async function (req, res) {

    res.json({
        message: 'Successfully authenticated',
        user_record: req.user
    });
});

module.exports = router;