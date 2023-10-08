const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql')
const othubdb_connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.OTHUB_DB
  })
  function executeOTHubQuery (query, params) {
    return new Promise((resolve, reject) => {
      othubdb_connection.query(query, params, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
  
  async function getOTHubData (query, params) {
    try {
      const results = await executeOTHubQuery(query, params)
      return results
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        query = `select * from user_header where public_address = ?`
        params = [jwt_payload._id]
        user_record = await getOTHubData(query, params)
            .then(results => {
            return results
            })
            .catch(error => {
            console.error('Error retrieving data:', error)
            })

            console.log(`QUERY RES: ${JSON.stringify(user_record)}`)
            if (user_record) return done(null, user_record);
            return done(null, false);
    })
  );

module.exports = passport;
