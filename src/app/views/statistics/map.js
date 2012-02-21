function ( doc ) 
{
    if ( doc.type == "tweet" )
    {
        time = new Date();
        time.setTime( doc.time );
        emit( [
                time.getUTCFullYear(),
                time.getUTCMonth() + 1,
                time.getUTCDate(),
                time.getUTCHours(),
                time.getUTCMinutes(),
                time.getUTCSeconds(),
            ],
            1
        );
    }
}
