if (typeof global === 'object') require('../src/script.js');

script.yield()
  .add(function () { script.display("First"); })
  .add(function () { script.display("Second"); })
  .add(function () { script.display("Third"); })
  .add(function () { script.display("Loading..."); })
  .add(function () {
    setTimeout(function () {
      script.display("Processing data...");
    }, 1000);
  })
  .add(function () { script.display("Done!"); })
  .run()

// Manual async sequencing
script.yield()
  .add(function () {
    script.display("Starting async operation...");
    setTimeout(function () {
      script.display("Async step 1 complete");
      this.yield.run(); // Continue via yield reference
    }.bind({ yield: this.yield }), 1000);
  })
  .add(function () {
    script.display("Running step 2");
  })
  .run();