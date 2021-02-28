let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login', alerts: req.flash() });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/business-contact',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
