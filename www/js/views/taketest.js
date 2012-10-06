/*global Flow*/
(function () {
  var TakeTest = {}
    , $el
    , result
    , slide;

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

    $slides.animate({top: currentPosition - 443}, {complete: _.once(function () {
      // if its a test
      if (slide === 3 || slide === 5) {
        Flow.modules.device.onData(function (error, value) {
          $circles.eq((slide - 3) / 2).animate(circleAttributes(value * 4), {complete: function () {
            $el.click(nextSlide);
          }});
        });

      // if its the graph
      } else if (slide === 6) {
        Flow.views.single_result.render($slides.eq(slide));
        Flow.modules.device.measure(function (error, data) {
          Flow.views.single_result.populate(data);
          result = data;
          $el.click(nextSlide);
        });

      // comments and shite
      } else if (slide === 7) {
        $el.find('a.button').click(function (evt) {
          evt.preventDefault();
          $el.find('a.button.selected').removeClass('selected');
          $(this).addClass('selected');
        });

        $el.find('button.button').click(_.once(function () {
          console.log('storing');

          result.used_inhaler = $el.find('a.button.selected').hasClass('yes');
          result.comment = $el.find('textarea').val();
          Flow.modules.storage.storeResult(result);

          setTimeout(function () { // TODO: Do some animation, spinner...
            Flow.views.home.navigateBackHome();
          }, 1000);
        }));
      } else {
        $el.click(nextSlide);
      }
    })});
  }

  TakeTest.render = function ($element) {
    var self = this;

    $element.html($('#test_tpl').text());

    $el = $element.find('#tests');
    $el.click(nextSlide);

    slide = 0;
    result = null;
  };

  Flow.views.taketest = TakeTest;
}());
