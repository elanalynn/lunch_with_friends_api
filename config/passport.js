const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const config = require('./oauth');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback : true 
    },
    (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
            if (!req.user) {
                User.findOne({ 'google.id' : profile.id }, (err, user) => {
                    if (err) return done(err);
                    if (user) {
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase();

                            user.save((err) => {
                                if (err) return done(err);
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save((err) => {
                            if (err) return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                console.log(req.user);
                const user = req.user;

                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err) return done(err);
                    return done(null, user);
                });
            }
        });
    }));
};