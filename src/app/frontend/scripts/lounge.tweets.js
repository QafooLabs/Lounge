/**
 * Tweet component
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.tweets = function()
    {
        var loadTweets = function( e, eventData )
        {
            Lounge.utils.query(
                "/_design/app/_view/home?descending=true",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweets", [data.rows] );
                }
            );
        };

        var tweet = function( e, eventData )
        {
            // Submit tweet to database
            var now = new Date();
            Lounge.utils.query(
                "/",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "tweeted" );
                },
                JSON.stringify( {
                    type: "tweet",
                    text: eventData.tweet,
                    user: null,
                    time: now.getTime(),
                } ),
                "POST"
            );
        };

        return this.each( function()
        {
            $(this).bind( "loadTweets", loadTweets );
            $(this).bind( "tweet", tweet );
        } );
    };
}( jQuery ) );
