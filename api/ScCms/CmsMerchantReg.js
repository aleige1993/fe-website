
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsMerchantReg = require('../../model/ScCms/CmsMerchantReg');
var merchantReg = CmsMerchantReg(connection, sequelize);

router.post('/merchantRegAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  merchantReg.create(req.body).then(function () {
    res.send(formactResult.success());
  }).catch(function () {
    res.send(formactResult.error());
  });
});

module.exports = router;
