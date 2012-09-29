/*globals Flow*/
(function () {
  var Device = {};

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
    }, Math.random() * 1000);
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
      var data = {};

      data.pef = 650 + (Math.random() * 300) - (Math.random() * 300);
      data.fev1 = 1.0 + Math.random() - Math.random();
      data.fvc = 650 + (Math.random() * 300) - (Math.random() * 300);
      data.series = [
        {volume: Math.random() * 10, time: 0,    flow: 1}
      , {volume: Math.random() * 10, time: 500,  flow: 1}
      , {volume: Math.random() * 10, time: 1000, flow: 1}
      , {volume: Math.random() * 10, time: 1500, flow: 1}
      , {volume: Math.random() * 10, time: 2000, flow: 1}
      , {volume: Math.random() * 10, time: 2500, flow: 1}
      , {volume: Math.random() * 10, time: 3000, flow: 1}
      ];

      fn(null, data);
    }, Math.random() * 1000);
  };

  Flow.modules.device = Device;
}());
