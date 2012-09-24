/*global Flow, Swipe*/
(function () {
  var Tutorial = {};

  Tutorial.initialize = function ($el) {
    window.swipe = new Swipe($el.find('#tutorial')[0]); // This API is retarded
  };

  Flow.views.tutorial = Tutorial;
}());
