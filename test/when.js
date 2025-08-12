if (typeof global === 'object') require('../src/script.js');

if (script.env.node) {
  script.when(function () {
    script.display('searching ...');
    if ('any' in script.global) {
      script.display(any);
    }
  });
  script.global.any = 'global: "any" is available';
}
if(script.env.browser) {
  script.when(function() {
    if('body' in document) {
      script.display('document: "body" is available')
    }
  })
}
