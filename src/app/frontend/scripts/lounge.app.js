(function( global ) {

    App = function() {
        var app = this;
        $( window ).bind( "route", function( event, data ) {
            app.initMainRoutes( data );
        } );

        $( window ).bind( "route:main", function( event, data ) {
            app.initMain( data );
        } );
    };

    /**
     * Initialize general application configuration
     *
     * @param Request request
     */
    App.prototype.initMainRoutes = function( request ) {
        $( '#content' ).templating();
        $( '#navigation' ).markCurrent( {
            "main": "viewTimeline"
        } );

        $( '#navigation' ).trigger( "markCurrentLink", [request.matched] );

        $( '#content' ).dispatch( "tweeted", '#twitter', 'reset' );
        $( '#twitter' ).dispatch( "submit", '#content', 'tweet', function ( data ) {
            return Lounge.utils.formToObject( '#twitter' );
        }, null, true );
    };

    /**
     * Initialize main tweet view of application
     *
     * @param Request request
     */
    App.prototype.initMain = function( request ) {
        $( '#content' ).tweets();
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

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.App = App;

})(this);
