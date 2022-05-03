const passport = require('passport');

const LocalStrategy = require('./local.strategy');
const jwtStrategy = require('./jwt.strategy');

passport.use(LocalStrategy);
passport.use(jwtStrategy);
