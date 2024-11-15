if( typeof dom === 'undefined' ) dom = {}
dom.on = function( o, s_ev, f ) {
  if( o.addEventListener ) o.addEventListener( s_ev, f, false );
  if( o.attachEvent ) o.attachEvent( 'on'+s_ev, f );
}
dom.off = function( o, s_ev, f ) {
  if( o.removeEventListener ) o.removeEventListener( s_e, f );
  if( o.detachEvent ) o.detachEvent( 'on'+s_ev, f );
}