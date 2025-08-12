require('../src/script.js');

var asyncOperation = new script.promise(function(resolve, reject) {
  setTimeout(function() {
    if (Math.random() > 0.5) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  }, 1000);
});

asyncOperation
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error(error);
  });