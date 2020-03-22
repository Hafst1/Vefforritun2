// Here you should setup the extensions

// 1. toArray()
Object.prototype.toArray = function() {
  return Object.values(this);
}

// 2. flatten()
Object.prototype.flatten = function() {
  // var temp, items, result = {};
  // for (items in Object) {
  //   temp = Object[items];
  //   while (typeof temp == 'object' && items in temp) {
  //     temp = temp[items];
  //   }
  //   result[items] = temp;
  // }
  // return result;
}

// 3. toJson()
Object.prototype.toJson = function() {
  return JSON.stringify(this);
}

// 4. containsProperty()
Object.prototype.containsProperty = function(item) {
  
  for (var i in this) {
  }

  // for (var i = 0; i < this.length; i++) {
  //   if (this.hasOwnProperty(item)) {
  //     return true;
  //   }
  // }
  // return false;
}

// 5. invert()
Object.prototype.invert = function() {
  var result = {};
  for (key in this) {
    if (this.hasOwnProperty((key))) {
      result[this[key]] = key;
    }
  }
  return result;
}