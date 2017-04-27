const User = require('../models/user');

function favouritesAdd(req, res) {
  User
  .findById(res.locals.currentUser._id)
  .exec()
  .then(user => {
    if (user.favourites.indexOf(req.params.id) === -1 ) {
      user.favourites.push(req.params.id);
      user.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
}

function favouritesDelete(req, res) {
  User
  .findByIdAndUpdate({ _id: res.locals.currentUser._id }, { $pull: { 'favourites': req.params.id } }, { new: true })
  .exec()
  .then(user => {
    console.log(user);
    res.redirect(`/users/${user._id}`);
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = {
  add: favouritesAdd,
  delete: favouritesDelete
};
