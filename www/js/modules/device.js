/*globals Flow*/
(function () {
  var Device = {}
    , average_pef = 650
    , average_fev1 = 4.7
    , average_fvc = 82;

  function randomSign() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  /**
   * Get the "blowing" data from the device
   *
   * @param {Function} fn
   */
  Device.onData = function (fn) {
    console.log('onData...');
    setTimeout(function () { // REPLACE WITH API
      console.log('done!');
      fn(null, Math.random() * 100);
    });
  };

  /**
   * Get the "results" measures from the device
   *
   * @param {Function} fn
   */
  Device.measure = function (fn) {
    console.log('measure...');

    setTimeout(function () { // REPLACE WITH API
      console.log('done!');
      var data = {}
        , duration = 2000 + (Math.floor(7 * Math.random()) * 1000)
        , number_steps = duration / 500
        , x_values
        , value = Math.random();

      x_values = _.map(_.range(number_steps), function (i) {
        return i * duration / number_steps;
      });

      data.pef = average_pef + (randomSign() * Math.random() * 300);
      data.fev1 = average_fev1 + (randomSign() * Math.random() * 2);
      data.fvc = average_fvc + (randomSign() * Math.random() * 0.2);

      data.series = _.map(x_values, function (time) {
        return {volume: Math.log(1 + (time * value)), time: time, flow: 1};
      });

      fn(null, data);
    });
  };

  Device.getClass = function (field, val) {
    console.log(field, val);
    switch (field) {
    case 'pef':
      return val > average_pef * 0.9 ? 'ok' : (val > average_pef * 0.8 ? 'down' : 'danger');
    case 'fev1':
      return val > average_fev1 * 0.8 ? 'ok' : (val > average_fev1 * 0.7 ? 'down' : 'danger');
    case 'fvc':
      return val > 80 ? 'ok' : (val > 70 ? 'down' : 'danger');
    }
  };

  Device.getUnit = function (field) {
    switch (field) {
    case 'pef':
      return 'L/min';
    case 'fev1':
      return 'L';
    case 'fvc':
      return '%';
    }
  };

  Flow.modules.device = Device;
}());
