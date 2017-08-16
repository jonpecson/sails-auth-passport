// used for User Controller - create actions
module.exports = function honeyPot(req, res, next) {

    if (req.isSocket) {
        if (req.session &&
            req.session.passport &&
            req.session.passport.user) {

            // Initialize passport
            sails.config.passport.Initialize()(req, res, function() {
                // Use the built in session
                sails.config.passport.session()(req, res, function() {
                    // Make the user available through the frontend 
                    // res.locals.user = req.user
                    // the user should be deserialized by passport now

                    next();
                })
            })

            // If you don't want to deserialize the user:
            // req.user = req.session.passport.user;
            // return next();

        } else {
            res.json(401);
        }

    } else if (res.isAuthenticated()) {
        return next();
    } else {
        // user is not allowed
        //  (default res.forbidden() behaviour can be overriden in 'config/403')
        return res.redirect('/login');
    }

}