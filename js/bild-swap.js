const getRndInteger = ( min, max ) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const loadImage = ( url ) => {
  const img = new Image();

  return new Promise( resolve => {
    img.src = url;
    img.addEventListener( 'load', () => {
      resolve( img );
    })
  })
}

const autoSwap = ( element, resources ) => {
  const url = resources[getRndInteger( 0, resources.length )].url + '&date=' + Date.now();

  loadImage( url )
  .then( img => {
    while ( element.firstChild ) {
      element.removeChild( element.firstChild );
    }
    element.prepend( img );

    setTimeout( autoSwap, 5000, element, resources );
  })
}

fetch( 'assets/resources.json' )
.then( resources => resources.json() )
.then( resources => {
  document.querySelectorAll( '.bildSwap' ).forEach( element => {
    autoSwap( element, resources );
  })
})