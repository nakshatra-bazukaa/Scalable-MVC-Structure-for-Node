module.exports.home = (req, res) => {
    return res.render('home.ejs', {
        title: 'HomePage',
        content: 'My Scalable Node Server'
    });
}