if(typeof global === 'object') require('../src/script.js');

script.display('script.env.node: ' + String(script.env.node));
script.display('script.env.browser: ' + String(script.env.browser));