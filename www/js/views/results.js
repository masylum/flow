/*global Flow*/
(function () {
  var Results = {};

  Results.render = function ($el) {
    var self = this
      , tpl = _.template($('#results_tpl').text());

    $el.html(tpl());
  };

  Flow.views.results = Results;
}());
