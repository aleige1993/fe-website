
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var CmsArticle = require('../../model/ScCms/CmsArticle');
var article = CmsArticle(connection, sequelize);

router.post('/articleList', (req, res, next) => {
  var id = req.body.id;
  if (id) {
    article.findOne({'where': {'id': id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function () {
      res.send(formactResult.error('获取失败'));
    });
  } else {
    res.send(formactResult.error('获取失败'));
  }
});

module.exports = router;
