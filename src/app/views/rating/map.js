function ( doc ) {
    if ( doc.type === "comment" ) {
        emit( [doc.tweet, doc.time], parseInt( doc.rating, 10 ) );
    }
}
