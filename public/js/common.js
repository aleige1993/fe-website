
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