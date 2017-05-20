module.exports = (app, passport) => {
  app.get('/', (req, res, next) => {
    res.send('lench api');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.rediect('/');
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  app.get('/auth/google/callback',
      passport.authenticate('google', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));

  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

  app.get('/connect/google/callback',
      passport.authorize('google', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));

  app.get('/unlink/google', isLoggedIn, (req, res) => {
      var user = req.user;
      user.google.token = undefined;
      user.save((err) => res.redirect('/profile'));
  });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

