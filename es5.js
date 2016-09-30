new function(){
  var style            = getComputedStyle || ( e => e.currentStyle )
  var inputs           = /input|select|textarea|button|object/i
  var links            = /a|area/i

  function tabard(){
    return Array.prototype.slice.call(
      document.getElementsByTagName( '*' )
    )
      // DOM conditions
      .filter( function( e ){ return(
          e.tabIndex != -1 && (
            inputs.test( e.tagName ) && !e.disabled ||
            links.test( e.tagName ) && ( e.href || e.tabIndex )
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
}
