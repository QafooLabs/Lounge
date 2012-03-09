function ( doc ) {
    if ( doc.type === "tweet" ) {
        var tags = doc.text.match( /#([A-Za-z0-9_-]+)/g );
        for ( i in tags ) {
            emit( [tags[i].substr( 1 ).toLowerCase(), doc.time], null );
        }
    }
}
