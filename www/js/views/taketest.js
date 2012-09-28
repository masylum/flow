/*global Flow*/
(function () {
  var TakeTest = {}
    , $el
    , slide = 0;


  function circleAttributes(diameter) {
    var radius = diameter / 2;

    return {
      'margin-top': -radius
    , 'margin-left': -radius
    , 'border-radius': radius
    , height: diameter
    , width: diameter
    };
  }

  function nextSlide() {
    var $slides = $el.children('div')
      , $circles = $el.find('.circle')
      , currentPosition = +$slides.css('top').slice(0, -2);

    slide += 1;

    $el.unbind('click', nextSlide);

    // after a test
    if (slide === 4 || slide === 6) {
      $circles.animate(circleAttributes(50));
    }

    $slides.animate({top: currentPosition - 350}, {complete: _.once(function () {
      // if its a test
      if (slide === 3 || slide === 5) {
        Flow.modules.device.onData(function (error, value) {
          $circles.eq((slide - 3) / 2).animate(circleAttributes(value * 4), {complete: function () {
            $el.click(nextSlide);
          }});
        });

      // if its the graph
      } else if (slide === 6) {
        Flow.modules.device.measure(function (error, data) {
          $el.find('.pef .value').text(data.pef);
          $el.find('.fev1 .value').text(data.fev1);
          $el.find('.fvc .value').text(data.fvc);

          $el.find('.icon').removeClass('spinner');
          $el.find('.pef .icon').addClass(data.pef > 1000 ? 'good' : 'down');
          $el.find('.fev1 .icon').addClass(data.fev1 > 1 ? 'good' : 'down');
          $el.find('.fvc .icon').addClass(data.fvc > 500 ? 'good' : 'down');
          $el.click(nextSlide);
        });
      // last one
      } else if (slide === 7) {
        $el.find('button').click(function () {
          setTimeout(function () { // Do some animation, spinner...
            Flow.views.home.navigateBackHome();
          }, 1000);
        });
      } else {
        $el.click(nextSlide);
      }
    })});
  }

  TakeTest.render = function ($element) {
    var self = this;

    $el = $element;

    $el.click(nextSlide);
    $el.html($('#test_tpl').text());
  };

  Flow.views.taketest = TakeTest;
}());
