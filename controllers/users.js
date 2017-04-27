const User = require('../models/user');
const Post = require('../models/post');

function usersShow(req, res) {
  let user;
  User
  .findById(req.params.id)
  .populate('favourites followers following')
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

function addFollower(req, res) {
  if ( req.params.id !== res.locals.currentUser._id ) {
    User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user.followers.push(res.locals.currentUser._id);
      user.save();
      return User.findById(res.locals.currentUser._id).exec();
    })
    .then(user => {
      user.following.push(req.params.id);
      user.save();
      res.redirect(`/users/${req.params.id}`);
    });
  } else {
    res.sendStatus(500);
  }
}

function removeFollower(req, res) {
  if ( req.params.id !== res.locals.currentUser._id ) {
    User
    .findByIdAndUpdate({ _id: res.locals.currentUser._id }, { $pull: { 'following': req.params.id } }).exec()
    .then(() => {
      return User.findByIdAndUpdate({ _id: req.params.id }, { $pull: { 'followers': res.locals.currentUser._id } }).exec();
    })
    .then(() => {
      res.redirect(`/users/${res.locals.currentUser._id}`);
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    res.sendStatus(500, { message: 'Following error' });
  }
}

module.exports = {
  show: usersShow,
  follow: addFollower,
  unfollow: removeFollower
};
