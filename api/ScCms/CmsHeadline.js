
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsHeadline = require('../../model/ScCms/CmsHeadline');
var headline = CmsHeadline(connection, sequelize);
var CmsColumn = require('../../model/ScCms/CmsColumn');
var column = CmsColumn(connection, sequelize);

function searchHeadlineList(req, res, next) {
  var currentPage = (req.body.currentPage || 1) / 1;
  var pageSize = (req.body.pageSize || 999999999) / 1;
  var searchOptions = {};
  if (req.body.title) {
    searchOptions['title'] = {$like: '%' + (req.body.title || '') + '%'};
  }
  if (req.body.columnType) {
    searchOptions['columnType'] = req.body.columnType;
  }
  if (req.body.terminal) {
    searchOptions['terminal'] = req.body.terminal;
  }
  if (req.body.appType) {
    searchOptions['appType'] = req.body.appType;
  }
  if (req.body.isUsed) {
    searchOptions['isUsed'] = req.body.isUsed;
  }
  headline.findAndCountAll({
    'where': searchOptions,
    'offset': (currentPage - 1) * pageSize,
    'limit': pageSize,
    'order': [['gmtCreate', 'DESC']]
  }).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function () {
    res.send(formactResult.error('获取失败'));
  });
}

router.post('/headlineList', (req, res, next) => {
  var columnName = req.body.columnName;
  if (columnName) {
    column.findAndCountAll({'where': {'name': columnName}}).then(function (result) {
      if (result && result.rows && result.rows.length) {
        req.body.columnType = result.rows[0].id;
        searchHeadlineList(req, res, next);
      } else {
        res.send(formactResult.success(result));
      }
    }).catch(function () {
      res.send(formactResult.error('获取失败'));
    });
  }
});

module.exports = router;
