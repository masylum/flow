/*global Flow, preventBehavior*/
(function () {
  var Home = {};

  function navigateToSection(evt) {
    evt.preventDefault();

    var li = $(evt.currentTarget)
      , section = li.attr('class');

    $('.menu').animate({opacity: 0, height: 0, 'padding-top': 0});
    $('.home').animate({'padding-top': '0px'});
    $('h1 img').animate({height: 25});

    _.each(['taketest', 'results', 'settings'], function (sel) {
      if (sel === section) {
        $('.t-' + section).animate({height: 443, 'padding-top': 0, 'padding-bottom': 0}, {complete: function () {
          Flow.views[sel].render($('#content'));
          $('#content').css({opacity: 1});
        }});
      } else {
        $('.t-' + sel).animate({opacity: 0, height: 0});
      }
    });
  }

  Home.navigateBackHome = function (evt) {
    $('#content').css({opacity: 0});
    $('.menu').animate({opacity: 1, height: 300, 'padding-top': 50});
    $('.home').animate({'padding-top': 20});
    $('h1 img').animate({height: 60});
    $('.t-settings,.t-taketest,.t-results').animate({height: 100, opacity: 1});
  };

  Home.render = function ($el) {
    $el.html($('#home_tpl').html());

    $el.find('ol.menu li').click(navigateToSection);
    $el.find('h1 a').click(function (evt) {
      evt.preventDefault();
      Home.navigateBackHome();
    });
  };

  Flow.views.home = Home;
}());
