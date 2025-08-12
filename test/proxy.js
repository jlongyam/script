if (typeof global === 'object') require('../src/script.js');

// basic
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

// chaining
/*
var originalScript = fn;
fn = script.proxy(fn, {
  call: function(target, args) {
    if (args.length === 0) return originalScript();
    // Handle module cases
    if (args[0].import || args[0].export) {
      // Module logic will go here later
      return target.apply(this, args);
    }
    return target.apply(this, args);
  },
  get: function(target, prop) {
    // Preserve existing properties
    if (prop in target) return target[prop];
    // Allow chaining
    return target;
  }
});
*/