module.exports = function termsAndCondition(req, res, next) {

    if (!req.params('terms')) {
        res.status(400).send({
            invalidAttributes: {
                terms: [{
                    message: 'You must accept terms and condition before you sign up.'
                }]
            }
        })
    } else {
        next();
    }

};