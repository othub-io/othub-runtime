const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

blockchain = "othub_db"
network = ""
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        query = `select * from user_header where public_address = ?`
        params = [jwt_payload._id]
        user_record = await queryDB.getData(query, params, network, blockchain)
            .then(results => {
            return results
            })
            .catch(error => {
            console.error('Error retrieving data:', error)
            })

            if (user_record) return done(null, user_record);
            return done(null, false);
    })
  );

module.exports = passport;
