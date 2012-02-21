/**
 * Tweet component
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.tweets = function()
    {
        var loadTweets = function( e )
        {
            Lounge.utils.query(
                "/_design/app/_view/home?descending=true",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweets", [data.rows] );
                }
            );
        };

        return this.each( function()
        {
            $(this).bind( "loadTweets", loadTweets );
        } );
    };
}( jQuery ) );
