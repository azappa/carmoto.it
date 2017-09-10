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


  //  -- loading latest items from autoscout24 --
  reqwest({
    url: 'https://5lytcix80a.execute-api.us-west-2.amazonaws.com/development/l',
    type: 'json',
    method: 'get',
    contentType: 'application/json',
    crossOrigin: true,
    error: function (err) {
      console.log(err);
      // document.getElementById('latest').style.display = 'none';
    },
    success: function (resp) {
      if (resp && resp.length > 0) {
        var latestContainer = document.getElementById('latest-ones');
        resp.forEach(function (el, i) {
          var thisEl = document.createElement('div');

          thisEl.classList.add('pure-u-1-2');
          thisEl.classList.add('pure-u-sm-1-3');
          thisEl.classList.add('pure-u-md-1-5');
          thisEl.classList.add('single-offer');

          var elModello = el.modello !== '' ? '<small>&nbsp;' + el.modello + '</small>' : '<small>&nbsp;</small>';
          var elMarca = el.marca !== '' ? '<h3>' + el.marca + elModello + '</h3>' : '<h3>' + elModello + '</h3>';
          var elNome = el.nome !== '' ? '<h5>' + el.nome + '</h5>' : '<h5>&nbsp;</h5>';
          var elImage = el.img !== '' ? '<img src="' + el.img + '" class="pure-img" />' : '<u>foto non disponibile</u>';
          var elUrl = el.url !== '' ? '<p><a href="' + el.url + '" target="_blank">Link</a></p>' : '<p><u>link non disponibile</u></p>';

          thisEl.innerHTML = '<div class="padding">' + elMarca + elNome + elImage + elUrl + '</div>';

          latestContainer.appendChild(thisEl);

          if (i === (resp.length - 1)) {
            document.getElementById('latest').style.display = 'block';
          }

        });
      }
    }
  });


  //  -- googlemaps --
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    var mapOptions = {
      zoom: 16,
      center: new google.maps.LatLng(45.67948,9.208471),
      disableDefaultUI: true,
      scrollwheel: false,
      styles: [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#b5cbe4'}]},{'featureType':'landscape','stylers':[{'color':'#efefef'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#83a5b0'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#bdcdd3'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#ffffff'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#e3eed3'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
    };
    if (isMobile.any) {
      mapOptions.draggable = false;
    }
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var _icon = new google.maps.MarkerImage('/assets/img/pin@2x.png', null, null, null, new google.maps.Size(150, 75));
    var _pin = new google.maps.Marker({
      position: new google.maps.LatLng(45.67948,9.208471),
      map: map,
      icon: _icon
    });

    window.google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(new google.maps.LatLng(45.67948, 9.208471));
    });
  }

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