require('../src/script.js');

new script.promise(function(resolve) {
  console.log('\n== waterfall ==\n')
  setTimeout(function() {
    console.log("[1] First task (async)");
    resolve(10);
  }, 1000);
})
.then(function(result) {
  console.log("[2] Got:", result);
  return new script.promise(function(resolve) {
    setTimeout(function() {
      console.log("[2.1] Second task (async)");
      resolve(result * 2);
    }, 500);
  });
})
.then(function(result) {
  console.log("[3] Got:", result);
  return result + 5;
})
.then(function(result) {
  console.log("[4] Final result:", result);
})
.catch(function(error) {
  console.error("Chain failed:", error);
});

script.promise.delay(2000)
  .then(function() {
    console.log("\n== delay ==\n")
  })
  .then(function() {
    console.log("Delay After 2 second")
  })
  .then(function() {
    console.log('Next after delay')
  })