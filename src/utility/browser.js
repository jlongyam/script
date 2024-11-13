// === browser === //
var browser = (function() {
  var ua = navigator.userAgent.toLowerCase();
  //var platform = navigator.platform.toLowerCase();
  // lang: language || browserLanguage
  return {
    is: {
      windows: ua.indexOf('windows') >= 0,
      //x86: ( platform === 'win32' ),
      trident: ua.indexOf('trident') >= 0,
      webkit: ua.indexOf('applewebkit') >= 0,
      gecko: ua.indexOf('gecko') >= 0,
      ie: ua.indexOf('msie') >= 0,
      safari: ua.indexOf('safari') >= 0,
      firefox: ua.indexOf('firefox') >= 0,
      chrome: ua.indexOf('chrome') >= 0
    }
  }
}());