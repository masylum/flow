/*global Flow*/
(function () {
  var Storage = {}
    , storage = window.localStorage;

  /**
   * Saves the result
   *
   * @param {Object} result
   */
  Storage.storeResult = function (result) {
    storage.setItem(Date.now(), JSON.stringify(result));
  };

  /**
   * Lists the results
   *
   * @return {Object} result
   */
  Storage.listResults = function () {
    var i = 0
      , results = {}
      , key;

    while (key = storage.key(i)) {
      results[key] = JSON.parse(storage.getItem(key));
      i += 1;
    }

    return results;
  };

  Flow.modules.storage = Storage;
}());
