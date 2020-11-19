module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be singed in first');
        return res.redirect('/login');
    }
    next();
};

// check if the user is not logged in
module.exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash('success', 'You are already signed in.');
    res.redirect('/campgrounds');
  };