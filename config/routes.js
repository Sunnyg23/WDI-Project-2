const express = require('express');
const router  = express.Router();

const posts         = require('../controllers/posts');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const users         = require('../controllers/users');
const favourites    = require('../controllers/favourites');

router.get('/', (req, res) => res.render('home'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);
router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.show);
router.route('/users/:id/follow')
  .post(users.follow);
router.route('/users/:id/unfollow')
  .post(users.unfollow);

router.route('/posts')
  .get(posts.index)
  .post(posts.create);
router.route('/posts/new')
  .get(posts.new);
router.route('/posts/:id')
  .get(posts.show)
  .put(posts.update)
  .delete(posts.delete);
router.route('/posts/:id/favourites')
  .post(favourites.add);
router.route('/posts/:id/edit')
  .get(posts.edit);

router.route('/favourites/:id/delete')
  .delete(favourites.delete);

module.exports = router;
