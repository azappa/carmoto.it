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
    url: 'https://zeit.carmoto.it/api/offers',
    type: 'json',
    method: 'get',
    contentType: 'application/json',
    crossOrigin: true,
    error: function (err) {
    },
    success: function (resp) {
      /*
        successful response is:
        [{
          "link": "https://www.autoscout24.it/annunci/smart-fortwo-700-coupe-passion-45-kw-benzina-nero-78b21d5f-fcf0-4af0-9d03-92c9a39f62ff",
          "name": "smart forTwo",
          "version": "700 coupé passion (45 kW)",
          "preview": "https://prod.pictures.autoscout24.net/listing-images/78b21d5f-fcf0-4af0-9d03-92c9a39f62ff_7df23a4f-c3e3-4471-8ca3-6d7175c41df0.jpg/420x315.jpg",
          "price": "&#x20AC; 2.500,-<as24-footnote-item>Prezzo finale offerto al pubblico, comprensivo di IVA, non vincolato all&#x2019;acquisto di un finanziamento, a permuta o rottamazione. Passaggio di propriet&#xE0; e IPT esclusi.</as24-footnote-item>",
          "data": "<ul data-item-name=\"vehicle-details\"><li>94.000 km</li><li>03/2005</li><li>45 kW (61 CV)</li><li>Usato</li><li>2 proprietari</li><li data-type=\"transmission-type\">Semiautomatico</li><li>Benzina</li><li>4,7 l/100 km (comb.)<as24-footnote-item>Ulteriori informazioni sul consumo dichiarato di carburante e sulle emissioni specifiche dichiarate di CO2 delle autovetture nuove sono reperibili nella guida sul consumo di carburante e sulle emissioni specifiche delle autovetture nuove, distribuita gratuitamente presso tutti i punti vendita e scaricabile dal sito: www.sviluppoeconomico.gov.it.</as24-footnote-item></li><li>113 g CO2/km (comb.)<as24-footnote-item>Ulteriori informazioni sul consumo dichiarato di carburante e sulle emissioni specifiche dichiarate di CO2 delle autovetture nuove sono reperibili nella guida sul consumo di carburante e sulle emissioni specifiche delle autovetture nuove, distribuita gratuitamente presso tutti i punti vendita e scaricabile dal sito: www.sviluppoeconomico.gov.it.</as24-footnote-item></li></ul>"
        }]
      */
      if (resp && resp.length > 0) {
        var latestContainer = document.getElementById('latest-ones');
        resp.forEach(function (el, i) {
          var thisEl = document.createElement('div');

          thisEl.classList.add('pure-u-1-2');
          thisEl.classList.add('pure-u-sm-1-3');
          thisEl.classList.add('pure-u-md-1-5');
          thisEl.classList.add('single-offer');

          var elMarca = el.name !== '' ? '<h3>' + el.name + '</h3>' : '';
          var elNome = el.version !== '' ? '<h5>' + el.version + '</h5>' : '';
          var elImage = el.preview !== '' ? '<img src="' + el.preview + '" class="pure-img" />' : '<u>foto non disponibile</u>';
          var elUrl = el.link !== '' ? '<p><a href="' + el.link + '" target="_blank">Link</a></p>' : '<p><u>link non disponibile</u></p>';

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