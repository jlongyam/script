/*! script.js - v1.0.0 | https://github.com/jlongyam/script */

function script(args){
  if(args) var name = args.name, require = args.require;
  if(name && ( name in window ) ) {
    window.addEventListener('load', window[name], false)
  }
  if(require) {
    function load(url) {
      var d = document, head = d.getElementsByTagName('head')[0];
      var file_type = url.split('.').pop(), new_url = url, base = script.path.base;
      if(base.element) new_url = base.actual + url
      if(file_type === 'js') {
        var new_script = document.createElement('script');
        new_script.src = new_url;
        head.appendChild(new_script);
        new_script.onload = function() {
          //head.removeChild(el)
        }
      }
    }
    if(typeof require === 'string' ) load(require)
    else for( url in require ) load(require[url])
  }
  
}
script.current = function() {
  var d = document;
  return d.currentScript || d.scripts[d.scripts.length-1];
}
script.internal = script.current()
script.path = {}
script.path.file = script.internal.getAttribute('src');
script.path.dir = script.path.file.replace('script.js','');
script.path.base = (function(){
  var
    element = (function() {
      var base = document.getElementsByTagName('base')[0];
      if(base) return base.getAttribute('href');
      else return false;
    }()),
    href = location.href.replace('file://',''),
    relative = (function() {
      // IE-fix, alias: script.internal.baseURI.replace('file://',''),
      if(element) {
        var i_element = element.split('/').length;
        var a_href = href.split('/'), a_result = [];
        for(var i = 0; i < a_href.length - i_element; i++ ){
          a_result.push(a_href[i])
        }
        return a_result.join('/')+'/';
      }
      else return href
    }()),
    rest = href.substring(relative.length),
    actual = rest.substring(0,rest.lastIndexOf('/')+1),
    file = href.split('/').pop()    
  ;
  return {
    element: element,
    href: href,
    relative: relative,
    rest: rest,
    actual: actual,
    file: file
  }
}())

// == console == //

if( 'console' in window ) var Console = console;
var console = {};
console.dev = false;
console.input = false;
console.setup = function() {
  var d = document, head = d.getElementsByTagName('head')[0],url;
  var console_box = d.createElement('div');
  console_box.id = 'console_box';
  d.body.appendChild(console_box);
  var console_output = d.createElement('div');
  console_output.id = 'console_output';
  console_box.appendChild(console_output);
  var console_link = d.createElement('link');
  console_link.id = 'console_link';
  console_link.rel = 'stylesheet';
  console_link.href = script.path.dir + 'script.css';
  head.insertBefore(console_link, d.scripts[0]);
};

// -- console.log -- //
console.log = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console log';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.log(arguments[i]);
    line.innerHTML += arguments[i];
  }
  console_output.appendChild(line);
}
