// === core == //
function object(){}
object.type = function(input) {
  return Object.prototype.toString.call(input).split(' ')[1].replace(']','');
};
function string(str){
  if( object.type(str) !== 'String' ) return
  return {
    valueOf: function() {
      return str;
    },
    include: function(search) {
      return this.valueOf().indexOf(search) >= 0
    }
  }
}

// == event == //
function when( o, s_ev, f ) {
  if( o.addEventListener ) o.addEventListener( s_ev, f, false );
  if( o.attachEvent ) o.attachEvent( 'on'+s_ev, f );
}
when.off = function( o, s_ev, f ) {
  if( o.removeEventListener ) o.removeEventListener( s_e, f );
  if( o.detachEvent ) o.detachEvent( 'on'+s_ev, f );
}