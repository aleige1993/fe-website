var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../mysql/connection/ScCms');
var CmsArticle = require('../model/ScCms/CmsArticle');
var article = CmsArticle(connection, sequelize);

var title = '颂车网-';
router.get('/', function (req, res, next) {
  res.render('index', {title: title + '首页'});
});
router.get('/newslist', function (req, res, next) {
  res.render('newslist', {title: title + '颂车资讯'});
});
router.get('/newsdetail', function (req, res, next) {
  var id = req.query.id;
  if (id) {
    article.findOne({'where': {'id': id}}).then(function (result) {
      res.render('newsdetail', { title: result.title, result: result });
    });
  }
});
router.get('/about', function (req, res, next) {
  res.render('about', {title: title + '关于颂车'});
});
router.get('/joinus', function (req, res, next) {
  res.render('joinus', {title: title + '招商加盟'});
});


module.exports = router;
