function tabard( selection ){
  var style = getComputedStyle || ( e => e.currentStyle )

  return [].slice.call(
      typeof selection == 'undefined'
    ? document.getElementsByTagName( '*' )
    : typeof selection == 'string'
    ? document.querySelectorAll( selection )
    : selection.length
    ? selection
    : selection.getElementsByTagName( '*' )
  )
  // DOM conditions
  .filter( function( e ){ return(
      e.tabIndex != -1 && (
        /input|select|textarea|button|object/i.test( e.tagName ) && !e.disabled ||
        /a|area/i.test( e.tagName ) && ( e.href || e.tabIndex )
      )
  ) } )
  // CSSOM conditions
  .filter( function( e ){ return(
    style( e ).visibility != 'hidden' &&
    style( e ).display    != 'none'
  ) } )
  // Sort by tabIndex
  .sort( function( a, b ){ return(
    a.tabIndex == b.tabIndex ? 0 : a.tabIndex > b.tabIndex ? 1 : -1
  ) } )
}

if( typeof module == 'object' )
  module.exports = tabard
else if( typeof define == 'function' )
  define( 'tabard', function(){ return tabard } )
else
  window.tabard = tabard
