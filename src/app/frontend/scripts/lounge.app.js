(function( global ) {

    App = function() {
        var app = this;

        $( '#content' ).templating();
        $( '#content' ).tweets();
        $( '#navigation' ).markCurrent( {
            "main": "viewTimeline"
        } );

        $( window ).bind( "route", app.initAppBase );
        $( window ).bind( "route:main", app.initMain );
        $( window ).bind( "route:statistics", app.initStatistics );
    };

    /**
     * Initialize general application configuration
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initAppBase = function( event, request ) {

        $( $.fn.dispatch.sources ).unbind( ".dispatcher" );
        $.fn.dispatch.sources = [];

        $( '#navigation' ).trigger( "markCurrentLink", [request.matched] );

        $( '#content' ).dispatch( "tweeted", '#twitter', 'reset' );
        $( '#twitter' ).dispatch( "submit", '#content', 'tweet', function ( data ) {
            return Lounge.utils.formToObject( '#twitter' );
        }, null, true );
    };

    /**
     * Initialize main tweet view of application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initMain = function( event, request ) {
       $( '#content' ).dispatch( "tweeted", '#content', 'loadTweets' );
        $( '#content' ).dispatch( "showTweets", '#content', 'updateContents', function ( data ) {
            return {
                template: "home.tpl",
                viewData: {
                    tweets: $.map( data, function( value ) {
                        var tweet  = value.doc;
                        tweet.time = Lounge.utils.formatTime( tweet.time );
                        return tweet;
                    } )
                }
            }
        } );
        $( '#content' ).trigger( "loadTweets" );
    };

    /**
     * Initialize statsitics view of application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initStatistics = function( event, request ) {
        $( '#content' ).dispatch( "showTweetStatistics", '#content', 'updateContents', function ( data ) {
            return {
                template: "statistics.tpl",
                viewData: {
                    "level":      data.groupLevel,
                    "statistics": $.map( data.statistics, function( row )
                        {
                            var date = row.key.slice( 0, 3 ).reverse().join( "." );
                            if ( row.key[3] )
                            {
                                date += " " + row.key[3] +
                                    ( row.key[4] ? ":" + row.key[4] : ":00" ) +
                                    ( row.key[5] ? "." + row.key[5] : "" );
                            }

                            return {
                                "date": date,
                                "count": row.value,
                            }
                        }
                    ),
                }
            }
        } );
        $( '#content' ).trigger( "tweetStatistics", [{
            groupLevel: request.url.params.groupLevel || 5
        }] );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.App = App;

})(this);
