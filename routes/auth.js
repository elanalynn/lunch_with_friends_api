const auth = require('../helpers/auth');

module.exports = (app, passport) => {

    app.get('/', (req, res, next) => {
        res.send('lench api');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : `${process.env.CLIENT_URL}/users/1`,
            failureRedirect : '/'
        }));

    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    app.get('/unlink/google', auth.isLoggedIn, (req, res) => {
        var user = req.user;
        user.google.token = undefined;
        user.save((err) => res.redirect('/profile'));
    });
};
