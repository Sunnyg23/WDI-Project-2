const env        = require('../config/env');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(env.db);

const User = require('../models/user');
const Post = require('../models/post');

User.collection.drop();
Post.collection.drop();

User
.create([{
  username: 'Sunnysingh',
  email: 'sunny@sunny.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'Tomjones',
  email: 'tom@tom.com',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.lengh} users created!`);

  return Post
  .create([{
    name: 'blah1',
    youtubeId: 'uvfxxehL6j8',
    description: 'blah',
    user: users[0]._id
  }, {
    name: 'blah2',
    youtubeId: 'liMNNZuWZwY',
    description: 'blah',
    user: users[1]._id
  }]);
})
  .then((posts) => {
    console.log(`${posts.length} posts created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
