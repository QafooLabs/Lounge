function ( head, req ) {
    start( {
        "headers": {
            "Content-Type": "text/html"
        }
    } );

    var Lounge = {
        Html: require( "modules/html" ).Html,
    };

    send( Lounge.Html.header( "Tweets" ) );
    while ( row = getRow() ) {
        send( Lounge.Html.showTweet( row.value ) );
    }
    send( Lounge.Html.footer() );
}
