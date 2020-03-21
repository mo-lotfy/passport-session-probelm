// auth.js
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login') // if not auth
  },

  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/dashboard');  // if auth    
  }
}

// app.js
// app.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'))
// app.get('/login', forwardAuthenticated, (req, res) => res.render('login'))
// app.get('/register', forwardAuthenticated, (req, res) => res.render('register'))
