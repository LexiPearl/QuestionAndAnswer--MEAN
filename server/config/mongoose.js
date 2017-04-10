var mongoose= require('mongoose');
var path = require('path');
var fs = require('fs');
var models_path= path.join(__dirname, './../models');
var dbURI = 'mongodb://localhost/questionAndAnswer';
mongoose.Promise=global.Promise;
mongoose.connect( dbURI );
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});
fs.readdirSync( models_path ).forEach( function( file ) {
  if(file.indexOf( '.js' )>=0 ) {
    require( models_path+ '/'+ file );
  }
});
