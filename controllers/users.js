const User = require('../models/user');
const Post = require('../models/post');

function usersShow(req, res) {
  let user;
  User
    .findById(req.params.id)
    .exec()
    .then(userData => {
      if (!userData) return res.status(404).render('error', { error: 'No user found.'});
      user = userData;
      return Post.find({ user: user._id }).exec();
    })
    .then(posts => {
      user.posts = posts;
      res.render('users/show', { user });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  show: usersShow
};
