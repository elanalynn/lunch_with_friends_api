const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

router.use(passport.initialize())
router.use(passport.session())

passport.use(new GoogleStrategy({
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`
    },
    (token, tokenSecret, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

router.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

module.exports = router;