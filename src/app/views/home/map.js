function ( doc ) 
{
    if ( doc.type == "tweet" )
    {
        emit( doc.time, doc );
    }
}
