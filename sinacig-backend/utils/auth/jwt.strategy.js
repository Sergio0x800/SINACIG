const { Strategy, ExtractJwt } = require('passport-jwt');

// const { config } = require('../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'hgdYFCQf9WDct7PLI3H2M6mkGTxSyil8',
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
