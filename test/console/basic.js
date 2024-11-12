console.log('Normal text');
console.log('<u>HTML text</u>');
console.log(navigator.userAgent);
var doc_name = location.href.split('/').pop();
var doc_type = doc_name.split('.').pop()
if( doc_type !== 'hta' ) {
  console.dev = true;
  console.log('log to dev console');
  console.dev = false
  console.log('log to dev disabled');
}