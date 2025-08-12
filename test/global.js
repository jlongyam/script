if (typeof global === 'object') require('../src/script.js');

if (script.env.node) {
  script.display('script.global === global: ' + String(script.global === global));
}
if (script.env.browser) {
  script.display('script.global === window : ' + String(script.global === window));
}