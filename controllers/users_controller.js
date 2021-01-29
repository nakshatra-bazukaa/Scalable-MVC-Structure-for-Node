module.exports.profile = (req, res) => {
    return res.render('users.ejs', {
        title: 'User Page',
        content: 'User data will be shown here'
    });
}