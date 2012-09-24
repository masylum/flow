/*global Flow*/
(function () {
  var Test = {};

  Test.render = function ($el) {
    var self = this;

    $el.html($('#test_tpl').text());
  };

  Flow.views.test = Test;
}());
