const router = require('express').Router()
const passport = require('passport')

router.use('/', require('./swagger'))

router.use('/employees', require('./employees'))

router.use('/clients', require('./clients'))




router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        req.session.destroy(function(err) {
            if (err) {
                return next(err)
            }
            
            // Clear the session cookie
            res.clearCookie('connect.sid')
            console.log('After destroyed session:', req.session)

            // Redirection only after the destruction the session 
            res.status(200).send('Logout carried out successfully')
        });
    });
});


module.exports = router
