const env        = require('../config/env');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(env.db);

const Post = require('../models/post');

Post.collection.drop();

Post
  .create([{
    name: 'blah',
    video: 'blah',
    description: 'blah'
  },{
    name: 'blah',
    video: 'blah',
    description: 'blah'
  }])
  .then((posts) => {
    console.log(`${posts.length} messages created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
