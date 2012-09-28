/*globals Flow*/
(function () {
  var Device = {};

  Device.onData = function (fn) {
    setTimeout(function () { // REPLACE WITH API
      fn(null, Math.random() * 100);
    }, Math.random() * 1000);
  };

  Device.measure = function (fn) {
    setTimeout(function () { // REPLACE WITH API
      var data = {};

      data.pef = 650;
      data.fev1 = 1.4;
      data.fvc = 650;
      data.series = [
        {volume: 1, time: 0,    flow: 1}
      , {volume: 2, time: 500,  flow: 1}
      , {volume: 3, time: 1000, flow: 1}
      , {volume: 4, time: 1500, flow: 1}
      , {volume: 3, time: 2000, flow: 1}
      , {volume: 2, time: 2500, flow: 1}
      , {volume: 1, time: 3000, flow: 1}
      ];

      fn(null, data);
    });
  };

  Flow.modules.device = Device;
}());
