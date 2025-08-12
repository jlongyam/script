require('../src/script.js');

script.yield()
  .add(function() { console.log("First"); })
  .add(function() { console.log("Second"); })
  .add(function() { console.log("Third"); })
  .add(function() { console.log("Loading..."); })
  .add(function() { 
    setTimeout(function() {
      console.log("Processing data..."); 
    }, 1000);
  })
  .add(function() { console.log("Done!"); })
  .run()