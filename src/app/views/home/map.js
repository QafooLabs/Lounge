function ( doc ) 
{
    if ( doc.type == "tweet" )
    {
        emit( [doc.time, doc._id, {}], null );
    }

    if ( doc.type == "comment" )
    {
        emit( [doc.tweetTime, doc.tweet, doc.time], null );
    }
}
