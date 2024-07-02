const isAuthenticated = (req, res, next) => {
    // console.log('isAuthenticated middleware called');
    // console.log(`req.isAuthenticated(): ${req.isAuthenticated()}`);
    // console.log(`req.session.user: ${JSON.stringify(req.session.user)}`);

    if (req.isAuthenticated() || req.session.user) {
        console.log('User is authenticated');
        return next();
    } else {
        console.log('User is not authenticated');
        res.status(401).send('Not authorized');
    }
};

module.exports = { isAuthenticated };
