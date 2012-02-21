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
        $( '#content' ).templating( {
            '/':         'start.tpl',
            '/search':   'results.tpl',
            '/exit':     'exit.tpl'
        } );

        $( '#navigation' ).markCurrent( {
            "main": "viewTimeline"
        } );

        $( '#navigation' ).trigger( "markCurrentLink", request.matched );
    };

    /**
     * Initialize main tweet view of application
     *
     * @param Request request
     */
    App.prototype.initMain = function( request ) {
        $( '#content' ).dispatch( "showTweets", '#content', 'updateContents' );
        $( '#content' ).trigger( "loadTweets" );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.App = App;

})(this);
