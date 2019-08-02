module.exports = (function () {
  const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç"
  const to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc"
  const mapping = {};
  for(let i = 0, j = from.length; i < j; i++ ){
    mapping[ from.charAt( i ) ] = to.charAt( i );
  }
  return function ( str ) {
    let ret = [];
    for( let i = 0, j = str.length; i < j; i++ ){
      let c = str.charAt( i );
      if( mapping.hasOwnProperty( str.charAt( i ) ) ){
        ret.push( mapping[ c ] );
      }else{
        ret.push( c );
      }
    }
    return ret.join( '' );
  }
})()
