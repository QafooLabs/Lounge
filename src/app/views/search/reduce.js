function( keys, values )
{
    var count = {};
    for ( var i in values )
    {
        for ( var id in values[i] )
        {
            if ( count[id] )
            {
                count[id] = values[i][id] + count[id];
            } else {
                count[id] = values[i][id];
            }
        }
    }

    return count;
}
