if (typeof global === 'object') require('../src/script.js');

script.fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log("Post 1:", data);
    script.display(JSON.stringify(data, null, 2));
  })
  .catch(function(error) {
    console.error("Fetch failed:", error);
  });