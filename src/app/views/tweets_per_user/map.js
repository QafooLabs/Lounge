function ( doc ) 
{
    if ( doc.type == "tweet" )
    {
        emit( [doc.user, doc.time], null );
    }
}
