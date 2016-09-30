const style            = getComputedStyle || ( e => e.currentStyle )
const inputs           = /input|select|textarea|button|object/i
const links            = /a|area/i

export default () =>
  Array.from( document.getElementsByTagName( '*' ) )
    // DOM conditions
    .filter( e =>
        e.tabIndex != -1 && (
          inputs.test( e.tagName ) && !e.disabled ||
          links.test( e.tagName ) && ( e.href || e.tabIndex )
        )
    )
    // CSSOM conditions
    .filter( e =>
      style( e ).visibility != 'hidden' &&
      style( e ).display    != 'none'
    )
    // Sort by tabIndex
    .sort( ( a, b ) =>
      a.tabIndex == b.tabIndex ? 0 : a.tabIndex > b.tabIndex ? 1 : -1
    )
