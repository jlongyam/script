script({ name: 'object', require: [
  'chain/forEach.js',
  'chain/hasProperty.js',
  'chain/createProperty.js',
  'chain/renameProperty.js',
  'chain/updateProperty.js',
  'chain/deleteProperty.js',
  'chain/createEvents.js',
  'chain/addEventListener.js',
  'keys.js'
]});

function object(args){
  if( typeof args !== 'object' ) return String(args);
  else {
    object.chain.args = args;
    return object.chain;  
  }
}
object.chain = {
  args: undefined,
  valueOf: function() {
    return this.args
  },
  toString: function() {
    return String(this.args)
  },
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};
