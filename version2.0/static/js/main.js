var CARGODURATION = 3000;
function changeCar(index) {
  if ($('.page-2 .car:animated').size()===0) {
    // $('.page2-text').hide();

    $('.car-'+index).addClass('running').stop(true, true).animate({
      left: '-150%'
    }, CARGODURATION, 'easeInOutQuint', function () {
      $('.car-'+index).css('left', '150%')
    });

    $('.car-'+(index+1)).addClass('running').stop(true, true).animate({
      left: '50%'
    }, CARGODURATION, 'easeInOutQuint');

    setTimeout(function () {
      $('.car-'+index).removeClass('running');
      $('.car-'+(index+1)).removeClass('running');

      $('.page2-text').fadeIn(500);
    },CARGODURATION-1000);
    // 轮询到了最后一辆车，让第一辆车过来循环
    if (changeCarTimerIndex >= 3) {
      $('.car-0').addClass('running').stop(true, true).animate({
        left: '50%'
      }, CARGODURATION, 'easeInOutQuint');
      setTimeout(function () {
        $('.car-0').removeClass('running');
        $('.page2-text').fadeIn(500);
      },CARGODURATION);
    }
    // 动画完成后，自增定时器标识
    setTimeout(function () {
      if(changeCarTimerIndex >= 3) {
        changeCarTimerIndex = 0;
      } else {
        changeCarTimerIndex+=1;
      }
    }, CARGODURATION);
  }
}
var changeCarTimer = null;
var changeCarTimerIndex=0;
// 重置第二页的状态
var resetPage2 = function () {
  if (changeCarTimer) {
    clearInterval(changeCarTimer);
    changeCarTimer = null;
  }
  changeCarTimerIndex=0;
  $('.page-2 .car:animated').stop(true, false);
  $('.page-2').find('.car').css('left', '150%');
  $('.page2-text').hide();
};
var initPage2Animate = function () {
  $('.car-0').addClass('running').animate({
    left: '50%'
  }, CARGODURATION, 'easeInOutQuint');
  setTimeout(function () {
    $('.car-0').removeClass('running');
    $('.page2-text').fadeIn(500);
  },CARGODURATION-1000);
  changeCarTimer = setInterval(function () {
    changeCar(changeCarTimerIndex);
  }, CARGODURATION);
};
$(function(){
  $('#fullpage').fullpage({
    sectionsColor: ['#0db8fd', '#ffffff', '#f3f3f3', '#eee', '#ffffff'],
    anchors: ['page1', 'page2', 'page3', 'joinus', 'page4'],
    menu: '#menu',
    resize:true,
    verticalCentered: true,
    navigation: false,
    navigationPosition: 'right',
    scrollingSpeed: 1000,
    easing: 'easeInOutQuint',
    touchSensitivity: 10,
    css3: true,
    lazyLoading: true,
    parallax: true,
    // responsiveWidth: 1440,
    scrollOverflow: true,
    // responsiveSlides: true,
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    afterLoad: function (anchorLink, index) {
      if (index != 1) {
        $('.top').addClass('blue-bg');
      } else {
        $('.top').removeClass('blue-bg');
      }
      if (2===index) {
        // alert(index);
        initPage2Animate();
      } else if(3 === index) {
        resetPage2();
        $('.page3-desc').addClass('animated fadeInRight').delay(1000).show();
        $('.page3-title, .page3-content').addClass('animated fadeInLeft').delay(1000).show();
      } else if(4 === index) {
        resetPage2();
        $('.joinus-title').addClass('animated fadeInDown').delay(1000).show();
        $('.page-joinus-content').addClass('animated fadeInUp').delay(1000).show();
      } else if (5 === index) {
        resetPage2();
        $('.J-qrcode').addClass('animated zoomIn').delay(1000).show();
      } else {
        resetPage2();
        $('.page2-text').fadeOut(500);
      }
    },
    onLeave: function (index, nextIndex, direction) {

    }
  });
  $(window).blur(function () {
    resetPage2();
  });
  $(window).focus(function () {
    // console.log($('.section.active').index());
    if (1 === $('.section.active').index()) {
      initPage2Animate();
    }
  });
});
