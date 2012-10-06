/*global Flow, RGraph*/
(function () {
  var SingleResult = {}
    , $el;

  function toSeconds(ms) {
    return String(ms / 1000) + 's';
  }

  SingleResult.render = function ($element) {
    var self = this
      , tpl = _.template($('#single_result_tpl').text());

    $el = $element;

    $el.html(tpl());
  };

  /**
   * Populates the view with data!
   *
   * @param {Object} data
   */
  SingleResult.populate = function (data) {
    var line = new RGraph.Line('chart', _.pluck(data.series, 'volume'));

    line.Set('chart.spline', true);
    line.Set('chart.colors', ['#a2d9ea']);
    line.Set('chart.linewidth', 3);
    line.Set('chart.background.grid', false);
    line.Set('chart.text.color', '#fff');
    line.Set('chart.axis.color', '#fff');
    line.Set('chart.labels', _.map(_.pluck(data.series, 'time'), toSeconds));
    line.Draw();

    _.each(['pef', 'fev1', 'fvc'], function (field) {
      var device = Flow.modules.device
        , klass = device.getClass(field, data[field]);

      $el.find('.' + field + ' .value').text(data[field].toFixed(2) + ' ' + device.getUnit(field));
      $el.find('.' + field).addClass(klass).find('img').attr('src', 'img/' + klass + '.png');
    });
  };

  Flow.views.single_result = SingleResult;
}());
