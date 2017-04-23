const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => res.render('statics/home'));
router.get('/statics/login', (req, res) => res.render('statics/login'));
router.get('/', (req, res) => res.render('statics/register'));
router.get('/', (req, res) => res.render('statics/profile'));
router.get('/', (req, res) => res.render('statics/add'));
router.get('/', (req, res) => res.render('statics/edit'));
router.get('/', (req, res) => res.render('statics/update'));
router.get('/', (req, res) => res.render('statics/delete'));
router.get('/', (req, res) => res.render('statics/followers'));
router.get('/', (req, res) => res.render('statics/following'));
router.get('/', (req, res) => res.render('statics/account'));



module.exports = router;
