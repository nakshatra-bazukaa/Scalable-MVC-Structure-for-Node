const User = require('../models/user');

module.exports.profile = (req, res) => {
    if(req.cookies.user_id)
        User.findById(req.cookies.user_id, (err, user) => {
            if(user)
                return res.render('users.ejs', {
                    title: 'User Page',
                    content: 'User data will be shown here'
                });
            else
                return res.redirect('/user/sign-in'); 
        });
    else
        return res.redirect('/user/sign-in');  
}

module.exports.sign_in = (req, res) => {
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render('sign-in.ejs', {
        title: 'sign-in'
    });
}

module.exports.sign_up = (req, res) => {
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render('sign-up.ejs', {
        title: 'sign-up'
    });
}

module.exports.create = (req, res) => {
    if(req.body.password != req.body.confirm_password)
        return res.redirect('back');
    
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('Error in finding user for sign up'); return; }

        if(!user){
            User.create(req.body, (err, user) => {
                if(err){console.log('Error in finding user for sign up'); return; }

                return res.redirect('/users/sign-in');
            })
        }else{
            res.redirect('back');
        }
    })
}

module.exports.create_session = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}