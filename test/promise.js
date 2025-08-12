if(typeof global === 'object') require('../src/script.js');

new script.promise(function(resolve) {
  script.display('\n== waterfall ==\n');
  setTimeout(function() {
    script.display("[1] First task (async)");
    resolve(10);
  }, 1000);
})
.then(function(result) {
  script.display("[2] Got:"+result);
  return new script.promise(function(resolve) {
    setTimeout(function() {
      script.display("[2.1] Second task (async)");
      resolve(result * 2);
    }, 500);
  });
})
.then(function(result) {
  script.display("[3] Got:"+result);
  return result + 5;
})
.then(function(result) {
  script.display("[4] Final result:"+result);
})
.catch(function(error) {
  script.display("Chain failed: "+error);
});

script.promise.delay(2000)
  .then(function() {
    script.display("\n== delay ==\n")
  })
  .then(function() {
    script.display("Delay After 2 second")
  })
  .then(function() {
    script.display('Next after delay')
  })