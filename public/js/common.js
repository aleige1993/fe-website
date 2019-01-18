
function MainConfig() {
  var DEV_CONFIG = {
    HTTPOPENAPIURL: 'http://192.168.200.247:10001'
  };
  var SIT_CONFIG = {
    HTTPOPENAPIURL: 'https://sit.api.songchejr.com'
  };
  var PROD_CONFIG = {
    HTTPOPENAPIURL: 'https://api.songchejr.com'
  };
  return DEV_CONFIG;
}

function axiosFormData(_url, _data, callback) {
  let _param = new FormData(); //创建form对象
  _param.append('message',JSON.stringify(_data));//通过append向form对象添加数据
  let _config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'appId': '100006',
      'version': '',
      'sign': 'SONGCHE'
    }
  };
  axios.post(MainConfig().HTTPOPENAPIURL +  _url, _param, _config).then(function (res) {
    let data = res.data;
    if (data.success && data.success === 'false') {
      layer.msg(data.message);
    }
    callback(data);
  }).catch(function (err) {});
}

$(function () {
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000 //可选选项，自动滑动
  });
  $('.common-header .menu li').mouseover(function () {
    $(this).find('.next-balloon').show();
  }).mouseout(function () {
    $(this).find('.next-balloon').hide();
  });
})