// TODO: Implement observer pattern

var observer = (function() {
  var topics = {},
  subId = -1;

  return {
    subscribe: function(topic, cb) {
      if (!topics[topic]) {
        topics[topic] = [];
      }
      topics[topic].push(cb);
    },
    emit: function(topic, data) {
      if (topics[topic]) {
        topics[topic].forEach((subscriber) => subscriber(data));
      }
    }, 
    broadcast: function(data) {
      if (!topics) { return false; }
      for (var i in topics) {
        for (var j in topics[i]) {
          topics[i][j].func();
        }
      }
    }
  }
})();