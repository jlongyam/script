(function() {
  function script() {}
  script.env = (function() {
    return {
      browser: (typeof window !== 'undefined' && typeof document !== 'undefined') ? true : false,
      node: (typeof process !== 'undefined' && process.versions && process.versions.node) ? true : false, 
      worker: (typeof self !== 'undefined' && typeof importScripts === 'function') ? true : false
    }
  })();
  script.root = (function() {
    if(typeof global === 'object') return global;
    if(typeof window === 'object') return window;
    if(typeof self === 'object') return self;
    if(typeof globalThis === 'object') return globalThis;
    return false; 
  })();
  script.when = function(execute) {
    var waiting = setInterval(function() {
      if(execute){
        execute();
        clearInterval(waiting);
      }
    }, 50);
    setTimeout(function() {
      clearInterval(waiting);
    }, 500);
  };
  // Initial
  script.root.script = script;
})()
