/*global Flow*/
(function () {
  var Results = {}
    , results
    , $el;

  function showResult(evt) {
    evt.preventDefault();
    var $li = $(this)
      , timestamp = $li.attr('id').split('_')[1];

    $el.find('.result').hide();
    $li.addClass('collapsed').show();

    Flow.views.single_result.render($li.find('.single_result'));
    Flow.views.single_result.populate(results[timestamp]);

    $li.click(function () {
      Results.render($('#content'));
    });
  }

  Results.render = function ($element) {
    var self = this
      , tpl = _.template($('#results_tpl').text());

    results = Flow.modules.storage.listResults();
    $element.html(tpl({results: results}));

    $el = $element.find('#results');
    $el.find('.result').click(showResult);
  };

  Flow.views.results = Results;
}());
