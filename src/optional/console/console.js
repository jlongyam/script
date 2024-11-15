if( 'console' in window ) var Console = console;
var console = {};
console.dev = false;
console.input = false;
console.html = true;
console.setup = function() {
  var d = document, head = d.getElementsByTagName('head')[0],url;
  var console_box = d.createElement('div');
  console_box.id = 'console_box';
  d.body.appendChild(console_box);
  var console_output = d.createElement('div');
  console_output.id = 'console_output';
  console_box.appendChild(console_output);
};
// -- console.log -- //
console.log = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console log';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.log(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerText += arguments[i];
  }
  console_output.appendChild(line);
}
