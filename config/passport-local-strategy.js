const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if(err){
                console.log('Error in finding user -----> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(err);
            }

            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if(err){
            console.log('Error in finding user -----> Passport');
            return done(err);
        }
        return done(null, user);
    })
})

module.exports = passport;