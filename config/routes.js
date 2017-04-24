const express = require('express');
const router  = express.Router();

const postsController = require('../controllers/posts');

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

module.exports = router;
