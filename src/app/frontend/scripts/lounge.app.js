(function( global ) {

    App = function() {
        var app = this;

        $( window ).user();
        $( '#content' ).templating();
        $( '#content' ).tweets();
        $( '#navigation' ).markCurrent( {
            "main":       "viewTimeline",
            "statistics": "statistics",
        } );

        $( window ).bind( "route", app.initAppBase );
        $( window ).bind( "route:404", app.showNotFound );
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

        // Reset all singals on "startup"
        $( $.fn.dispatch.sources ).unbind( ".dispatcher" );
        $.fn.dispatch.sources = [];

        // Navigation handling
        $( '#navigation' ).trigger( "markCurrentLink", [request.matched] );

        // Global tweet form handling
        $( '#content' ).dispatch( "tweeted", '#twitter', 'reset' );
        $( '#twitter' ).dispatch( "submit", '#content', 'tweet', function ( data ) {
            return Lounge.utils.formToObject( '#twitter' );
        }, null, true );

        // Global search form handling
        // @TODO: Implement.

        // Global login form handling
        $( window ).trigger( "checkLogin" );
        $( window ).dispatch( "statusLoggedOut", '#content', 'setTwitterUser', function ( data ) {
            return null;
        } );
        $( window ).dispatch( "statusLoggedOut", '#content', 'updatePartial', function ( data ) {
            return {
                target:   '#login',
                template: 'logout.tpl',
                viewData: data.userCtx,
                success:  function() {
                    $( "#userLogin" ).dispatch( "submit", window, "login", function ( data ) {
                        return Lounge.utils.formToObject( "#userLogin" );
                    }, null, true );
                }
            }
        } );
        $( window ).dispatch( "statusLoggedIn", '#content', 'setTwitterUser', function ( data ) {
            return data.userCtx.name;
        } );
        $( window ).dispatch( "statusLoggedIn", '#content', 'updatePartial', function ( data ) {
            return {
                target:   '#login',
                template: 'login.tpl',
                viewData: data.userCtx,
                success:  function() {
                    $( "#userLogout" ).unbind( "click" );
                    $( "#userLogout" ).dispatch( "click", window, "logout", null, null, true );
                }
            }
        } );
    };

    /**
     * Show not found result for unmatched routes
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.showNotFound = function( event, request ) {
        $( '#content' ).trigger( 'updateContents', {
            template: "404.tpl",
        } );
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
