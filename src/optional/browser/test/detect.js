script({ name: 'detect', require: '../browser.js' });

function detect() {
  var str = '';
  str += 'appCodeName: '+navigator.appCodeName+'\n';
  str += 'cpuClass: '+navigator.cpuClass+'\n'
  str += 'browserLanguage: '+navigator.browserLanguage+'\n',
  str += 'language: '+navigator.language+'\n'
  str += 'appName: '+navigator.appName+'\n'
  str += 'appVersion: '+navigator.appVersion+'\n'
  str += 'platform: '+navigator.platform+'\n'
  console.log(str)
  console.log(navigator.userAgent.toLowerCase());
  console.log( JSON.stringify(browser,0,2) );
}