const Post = require('../models/post');

function postsIndex(req, res) {
  Post
  .find()
  .exec()
  .then(posts => {
    res.render('posts/index', { posts });
  })
  .catch(err => {
    res.status(500).render('error', { error: err });
  });
}

function postsNew(req, res) {
  res.render('posts/new');
}

function postsShow(req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      if(!post) return res.status(404).render('error', { error: 'No Post found.'});
      res.render('posts/show', { post });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function postsCreate(req, res) {
  Post
  .create(req.body)
  .then(() => {
    res.redirect('/posts');
  });
}

function postsEdit(req, res) {
  Post
  .findById(req.params.id)
  .exec()
  .then(post =>  {
    if (!post) return res.status(404).render('error', { error: 'No Post found.'});
    res.render('posts/edit', { post });
  })
  .catch(err => {
    res.status(500).render('error', { error: err });
  });
}

function postsUpdate(req, res) {
  Post
  .findById(req.params.id)
  .exec()
  .then(post => {
    if (!post) return res.status(404).render('error', { error: 'No post found.'});

    for(const field in req.body) {
      post[field] = req.body[post];
    }
    return post.save();
  })
  .then(post => {
    res.redirect(`/posts/${post.id}`);
  });
}

function postsDelete(req, res) {
  Post
  .findById(req.params.id)
  .exec()
  .then(post => {
    if (!post) return res.status(404).render('error', { error: 'No post found.'});
    return post.remove();
  })
.then(() => {
  res.redirect('/posts');
})
.catch(err => {
  res.status(500).render('error', { error: err });
});
}



module.exports = {
  index: postsIndex,
  new: postsNew,
  show: postsShow,
  create: postsCreate,
  edit: postsEdit,
  update: postsUpdate,
  delete: postsDelete
};
