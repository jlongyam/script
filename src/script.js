/*! script.js v1.0.0 | MIT | https://github.com/jlongyam/script */

// == console == //

if( 'console' in window ) var Console = console;
var console = {};
console.dev = false;
console.input = false;
console.setup = function() {
  var console_box = document.createElement('div');
  console_box.id = 'console_box';
  document.body.appendChild(console_box);
  var console_output = document.createElement('div');
  console_output.id = 'console_output';
  console_box.appendChild(console_output);
  var console_style = document.createElement('style');
  console_style.id = 'console_style';
  var head = document.getElementsByTagName('head')[0]
  head.insertBefore( console_style, document.scripts[0] );
  var style_text = [
    '#console_box {',
    '  box-sizing: border-box;',
    '  border: 2px solid whitesmoke;',
    '  padding: 8px',
    '  font: 16px/1.25 Monaco, Consolas, "Roboto Mono", "Ubuntu Monospace", monospace;',
    '}',
    '#console_output {',
    '  padding: 8px;',
    '  padding-bottom: 0;',
    '  overflow: auto;',
    '}',
    '#console_input {}',
    '.console {',
    '  white-space: pre;',
    '  border-left: 8px solid gray;',
    '  padding: 8px;',
    '  background-color: black;',
    '  margin-bottom: 8px;',
    '}',
    '.console.log {',
    '  color: silver;',  
    '}'
  ];
  console_style.innerHTML = style_text.join('\n');
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

