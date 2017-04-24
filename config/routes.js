const express = require('express');
const router  = express.Router();

const postsController = require('../controllers/posts');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');


router.get('/', (req, res) => res.render('home'));

router.route('/posts')
  .get(postsController.index)
  .post(postsController.create);
router.route('/posts/new')
  .get(postsController.new);
router.route('/posts/:id')
  .get(postsController.show)
  .put(postsController.update)
  .delete(postsController.delete);
router.route('/posts/:id/edit')
  .get(postsController.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
