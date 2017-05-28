'use strict';

var express = require('express');
var controller = require('./userpost.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/post/:id',controller.showpost);
router.get('/user/:id',controller.showuser);
router.get('/postuser/:userid/:postid',controller.showit);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
// router.delete('/user/:id' ,controller.deleteall);

module.exports = router;
