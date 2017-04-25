const User = require('../models/user');

function usersProfile(req, res) {
  return res.render('users/profile');
}

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.status(404).render('error', { error: 'No user found.'});
      res.render('users/show', { user });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  profile: usersProfile,
  show: usersShow
};
