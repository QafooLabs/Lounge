function( doc )
{
    if ( doc.type == "tweet" )
    {
        // Simple word indexing, does not respect overall occurences of words,
        // stopwords, different word seperation characters, or word variations.
        var text  = doc.text.replace( /[\s:.,!?-]+/g, " " );
        var words = text.split( " " );
        for ( var i = 0; i < words.length; ++i )
        {
            value = {};
            value[doc._id] = 1;
            emit( words[i].toLowerCase(), value );
        }
    }
}
