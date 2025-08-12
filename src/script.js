(function() {
  function fn() {
    if(arguments.length === 0) {
      if(fn.env.browser) {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      }
      if(fn.env.node) return __filename;
    }
  }
  fn.env = (function() {
    return {
      browser: (typeof window !== 'undefined' && typeof document !== 'undefined') ? true : false,
      node: (typeof process !== 'undefined' && process.versions && process.versions.node) ? true : false, 
      worker: (typeof self !== 'undefined' && typeof importScripts === 'function') ? true : false
    }
  })();
  fn.global = (function() {
    if(typeof global === 'object') return global;
    if(typeof window === 'object') return window;
    if(typeof self === 'object') return self;
    if(typeof globalThis === 'object') return globalThis;
    return false; 
  })();
  fn.when = function(execute) {
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
  fn.promise = function(executor) {
    var callbacks = [];
    var resolved = false;
    var result;
    var error;
    function resolve(value) {
      if (!resolved) {
        resolved = true;
        result = value;
        callbacks.forEach(function(cb) {
          try {
            cb.onSuccess(value);
          } catch (e) {}
        });
      }
    }
    function reject(reason) {
      if (!resolved) {
        resolved = true;
        error = reason;
        callbacks.forEach(function(cb) {
          try { cb.onFailure(reason) } catch (e) {}
        });
      }
    }
    this.then = function(onSuccess, onFailure) {
      return new fn.promise(function(resolve, reject) {
        if (resolved) {
          if (error && onFailure) {
            try {
              resolve(onFailure(error));
              return
            } catch (e) {
              reject(e);
              return
            }
          }
          if (!error && onSuccess) {
            try {
              resolve(onSuccess(result));
              return
            } catch (e) {
              reject(e);
              return
            }
          }
        }
        callbacks.push({
          onSuccess: function(value) {
            try {
              resolve(onSuccess ? onSuccess(value) : value)
            } catch (e) { reject(e) }
          },
          onFailure: function(reason) {
            try {
              if (onFailure) {
                resolve(onFailure(reason))
              } else {
                reject(reason)
              }
            } catch (e) {reject(e) }
          }
        });
      });
    };
    this.catch = function(onFailure) {
      return this.then(null, onFailure)
    };
    try {
      executor(resolve, reject)
    } catch (e) { reject(e) }
  };
  fn.promise.resolve = function(value) {
    return new fn.promise(function(resolve) {
      resolve(value)
    })
  };
  fn.promise.reject = function(reason) {
    return new fn.promise(function(_, reject) {
      reject(reason)
    })
  };
  fn.promise.all = function(promises) {
    return new fn.promise(function(resolve, reject) {
      var results = [];
      var remaining = promises.length;
      if (remaining === 0) {
        return resolve(results)
      }
      promises.forEach(function(promise, index) {
        promise.then(function(value) {
          results[index] = value;
          remaining--;
          if (remaining === 0) {
            resolve(results)
          }
        }, reject)
      })
    })
  };
  // Initial
  fn.global.script = fn;
  // Internal
  //console.log(script());
})();
