if (typeof global === 'object') require('../src/script.js');

var fetchMock = script.async(function*() {
  try {
    yield script.await(script.promise.delay(800));
    script.display("A. Data fetched");
    return { data: 123 };
  } catch (e) {
    script.display("B. Error: "+e.message);
    return null;
  }
});

fetchMock().then(function(result) {
  script.display("C. Final result: "+JSON.stringify(result));
});