require('../src/script.js');

script.when(function() {
  console.log('searching ...');
  if('any' in script.root) {
    console.log(any);
  }
});

script.root.any = 'any is available';
