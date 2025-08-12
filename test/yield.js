if (typeof global === 'object') require('../src/script.js');

script.yield()
  .add(function() { script.display("First"); })
  .add(function() { script.display("Second"); })
  .add(function() { script.display("Third"); })
  .add(function() { script.display("Loading..."); })
  .add(function() { 
    setTimeout(function() {
      script.display("Processing data..."); 
    }, 1000);
  })
  .add(function() { script.display("Done!"); })
  .run()