(function () {
  function fn() {
    if (arguments.length === 0) {
      if (fn.env.browser) {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      }
      if (fn.env.node) return __filename;
    }
  }
  fn.env = (function () {
    return {
      browser: (typeof window !== 'undefined' && typeof document !== 'undefined') ? true : false,
      node: (typeof process !== 'undefined' && process.versions && process.versions.node) ? true : false,
      worker: (typeof self !== 'undefined' && typeof importScripts === 'function') ? true : false
    }
  })();
  fn.global = (function () {
    if (typeof global === 'object') return global;
    if (typeof window === 'object') return window;
    if (typeof self === 'object') return self;
    if (typeof globalThis === 'object') return globalThis;
    return false;
  })();
  fn.when = function (execute) {
    var waiting = setInterval(function () {
      if (execute) {
        execute();
        clearInterval(waiting);
      }
    }, 50);
    setTimeout(function () {
      clearInterval(waiting);
    }, 500);
  };
  fn.display = function (input) {
    if (fn.env.node) console.log(input);
    if (fn.env.browser) {
      var pre = document.createElement('pre');
      pre.innerHTML = input;
      fn.when(function () {
        if ('body' in document) {
          parent = document.getElementById('display') || document.body
          parent.appendChild(pre)
        }
      })
    }
  };
  fn.promise = function (executor) {
    var callbacks = [];
    var resolved = false;
    var result;
    var error;
    function resolve(value) {
      if (!resolved) {
        if (value && typeof value.then === 'function') {
          value.then(resolve, reject);
          return
        }
        resolved = true;
        result = value;
        callbacks.forEach(function (cb) {
          cb.onSuccess(value)
        })
      }
    }

    function reject(reason) {
      if (!resolved) {
        resolved = true;
        error = reason;
        callbacks.forEach(function (cb) {
          cb.onFailure(reason);
        });
      }
    }
    this.then = function (onSuccess, onFailure) {
      return new fn.promise(function (resolve, reject) {
        function handle() {
          try {
            var callback = error ? onFailure : onSuccess;
            if (typeof callback === 'function') {
              var nextValue = callback(error || result);
              resolve(nextValue)
            } else if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          } catch (e) { reject(e) }
        }
        if (resolved) {
          setTimeout(handle, 0)
        } else {
          callbacks.push({
            onSuccess: function (value) {
              setTimeout(function () { handle(); }, 0)
            },
            onFailure: function (reason) {
              setTimeout(function () { handle(); }, 0)
            }
          });
        }
      })
    };
    this.catch = function (onFailure) {
      return this.then(null, onFailure)
    };
    try {
      executor(resolve, reject)
    } catch (e) { reject(e) }
  };
  fn.promise.resolve = function (value) {
    return new fn.promise(function (resolve) {
      resolve(value)
    })
  };
  fn.promise.reject = function (reason) {
    return new fn.promise(function (_, reject) {
      reject(reason)
    })
  };
  fn.promise.all = function (promises) {
    return new fn.promise(function (resolve, reject) {
      var results = [];
      var remaining = promises.length;
      if (remaining === 0) {
        return resolve(results)
      }
      promises.forEach(function (promise, index) {
        promise.then(function (value) {
          results[index] = value;
          remaining--;
          if (remaining === 0) {
            resolve(results)
          }
        }, reject)
      })
    })
  };
  fn.promise.delay = function (ms) {
    return new fn.promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  };
  fn.yield = function () {
    var tasks = [];
    var yieldInstance = {
      add: function (task) {
        tasks.push(task);
        return yieldInstance
      },
      run: function () {
        if (tasks.length > 0) {
          var task = tasks.shift();
          setTimeout(function () {
            task.call({ yield: yieldInstance })
          }, 0)
        }
      }
    };
    return yieldInstance
  };
  fn.async = function (generatorFunc) {
    return function () {
      var args = arguments;
      return new fn.promise(function (resolve, reject) {
        if (typeof generatorFunc !== 'function') {
          return reject(new Error('Async must wrap a generator function'))
        }
        var generator;
        try {
          generator = generatorFunc.apply(this, args);
          if (!generator || typeof generator.next !== 'function') {
            throw new Error('Argument must be a generator function')
          }
        } catch (e) {
          return reject(e)
        }
        function step(nextFn) {
          try {
            var result = nextFn();
            if (result.done) {
              return resolve(result.value);
            }
            var value = result.value;
            if (!(value && typeof value.then === 'function')) {
              value = fn.promise.resolve(value);
            }
            value.then(
              function (v) { step(function () { return generator.next(v); }); },
              function (e) { step(function () { return generator.throw(e); }); }
            );
          } catch (e) {
            reject(e);
          }
        }
        step(function () { return generator.next(); })
      })
    }
  };
  fn.await = function (promise) {
    return {
      then: function (onFulfilled, onRejected) {
        return promise.then(
          onFulfilled,
          function (e) {
            return onRejected ? onRejected(e) : fn.promise.reject(e)
          }
        )
      }
    }
  };
  fn.fetch = function (url, options) {
    return new fn.promise(function (resolve, reject) {
      if (fn.env.node) {
        var https = require('https');
        var req = https.request(url, options || {}, function (res) {
          var data = [];
          res.on('data', chunk => data.push(chunk));
          res.on('end', () => {
            var response = {
              ok: res.statusCode >= 200 && res.statusCode < 300,
              status: res.statusCode,
              statusText: res.statusMessage,
              text: function () { return fn.promise.resolve(Buffer.concat(data).toString()); },
              json: function () {
                try {
                  return fn.promise.resolve(JSON.parse(Buffer.concat(data).toString()));
                } catch (e) {
                  return fn.promise.reject(e);
                }
              }
            };
            resolve(response);
          });
        });
        req.on('error', reject);
        if (options && options.body) req.write(options.body);
        req.end();
      }
      else if (fn.env.browser) {
        var xhr = new XMLHttpRequest();
        var method = (options && options.method) || "GET";
        xhr.open(method, url, true);

        if (options && options.headers) {
          for (var key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
          }
        }

        xhr.onload = function () {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            text: function () { return fn.promise.resolve(xhr.responseText); },
            json: function () {
              try {
                return fn.promise.resolve(JSON.parse(xhr.responseText));
              } catch (e) {
                return fn.promise.reject(e);
              }
            }
          });
        };
        xhr.onerror = function () {
          reject(new Error('Network error'));
        };
        xhr.send(options && options.body);
      }
      else {
        reject(new Error('Unsupported environment'));
      }
    });
  };
  // Initial
  fn.global.script = fn;
  // Internal
  console.log(script());
})();
