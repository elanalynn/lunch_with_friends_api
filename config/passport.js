const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./oauth');
const User = require('../models/user');
const userDbApi = require('../db/users');

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
                User.findOne( { 'google.id' : profile.id }, (err, user) => {
                    if (err) return done(err);
                    if (user) {
                        if (!user.token) {
                            user.token = token;
                            user.name  = profile.displayName;
                            user.email = (profile.emails[0].value || '').toLowerCase();

                            updatedUser = {
                                id: user.id,
                                token: user.token,
                                first_name: user.name.split(' ')[0],
                                last_name: user.name.split(' ')[1],
                                email: user.email,
                                avatar_link: profile._json['picture']
                            }
                            userDbApi.saveOne(updatedUser);
                            user.save((err) => {
                                if (err) return done(err);
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.id = profile.id;
                        newUser.token = token;
                        newUser.name  = profile.displayName;
                        newUser.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.avatar_link = profile._json['picture'];

                        userDbApi.saveOne(newUser);
                        user.save((err) => {
                            if (err) return done(err);
                            return done(null, user);
                        });
                    }
                });

            } else {
                const user = req.user;

                user.id = profile.id;
                user.token = token;
                user.name = profile.displayName;
                user.email = (profile.emails[0].value || '').toLowerCase();
                user.avatar_link = profile._json['picture'];

                userDbApi.saveOne(user);
                user.save((err) => {
                    if (err) return done(err);
                    return done(null, user);
                });
}
        });
    }));
};