if (typeof global === 'object') require('../src/script.js');

var original = { count: 0 };
var proxied = script.proxy(original, {
  get: function(target, prop) {
    script.display('Accessed: ' + prop);
    return target[prop];
  },
  set: function(target, prop, value) {
    script.display('Setting: ' + prop + '=' + value);
    target[prop] = value;
    return true;
  }
});

proxied.count;
proxied.count = 5;