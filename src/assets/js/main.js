(function () {

  'use strict';

  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;

  NodeList.prototype.on = function (event, listener) {
    this.forEach(function (el) {
      el.addEventListener(event, listener);
    });
  };

  //  -- initialize smooth scroll for anchors --
  smoothScroll.init({ updateURL: false, offset: document.querySelector('nav').offsetHeight });

  //  -- menu effects --
  function onScroll() {
    var top = window.pageYOffset || document.documentElement.scrollTop;
    var first = document.querySelectorAll('.page')[0];
    var nav = document.querySelector('nav');

    if (top >= first.offsetHeight) {
      nav.classList.add('fixed');
    } else {
      nav.classList.remove('fixed');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);

})();


//  -- damn slick slider ;) --
$(function () {
  'use strict';

  var slickOptionsSQ = {
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    dots: true,
    draggable: false,
    infinite: true,
    variableWidth:true,
    slidesToShow: 1,
    centerMode: true,
    pauseOnHover: false
  };
  $('.square-pics').slick(slickOptionsSQ);

});