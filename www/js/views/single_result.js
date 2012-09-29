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

    line.Set('chart.curvy', true);
    line.Set('chart.labels', _.map(_.pluck(data.series, 'time'), toSeconds));
    line.Draw();

    $el.find('.pef .value').text(data.pef.toFixed(2));
    $el.find('.fev1 .value').text(data.fev1.toFixed(2));
    $el.find('.fvc .value').text(data.fvc.toFixed(2));

    // PEF
    if (data.pef > 1000) {
      $el.find('.pef').addClass('good').find('img').attr('src', 'img/ok.png');
    } else {
      $el.find('.pef').addClass('down').find('img').attr('src', 'img/down.png');
    }

    // FEV1
    if (data.fev1 > 1) {
      $el.find('.fev1').addClass('good').find('img').attr('src', 'img/ok.png');
    } else {
      $el.find('.fev1').addClass('down').find('img').attr('src', 'img/down.png');
    }

    // FVC
    if (data.fvc > 500) {
      $el.find('.fvc').addClass('good').find('img').attr('src', 'img/ok.png');
    } else {
      $el.find('.fvc').addClass('down').find('img').attr('src', 'img/down.png');
    }
  };

  Flow.views.single_result = SingleResult;
}());
