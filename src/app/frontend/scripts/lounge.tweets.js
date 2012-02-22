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
            Lounge.utils.queryApi(
                "/_design/app/_view/home?descending=true&include_docs=true",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweets", [data.rows] );
                }
            );
        };

        var loadStatistics = function( e, eventData )
        {
            var groupLevel = eventData.groupLevel || 5;
            Lounge.utils.query(
                "/_design/app/_view/statistics?group_level=" + groupLevel,
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweetStatistics", [{
                        groupLevel: groupLevel,
                        statistics: data.rows
                    }] );
                }
            );
        };

        var tweet = function( e, eventData )
        {
            // Submit tweet to database
            var now = new Date();
            Lounge.utils.queryApi(
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
            $(this).bind( "tweetStatistics", loadStatistics );
            $(this).bind( "tweet", tweet );
        } );
    };
}( jQuery ) );
