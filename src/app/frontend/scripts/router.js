(function( global ) {

    Router = function( routes ) {
        /**
         * Routes
         *
         * @var hash
         */
        this.routes = routes || {};
    };

    /**
     * Initilize application depending on matched path. Since different pages
     * have different application configuration / use differen application
     * widgets.
     *
     * @param string url
     */
    Router.prototype.route = function( url ) {
        $.each( this.routes, function( identifier, route ) {
            if ( route.test( url.path ) ) {
                console.log( "Matched " + route + " as route:" + identifier );
                $( window ).trigger( "route:" + identifier, url );
                $( window ).trigger( "route", url );
            }
        } );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.Router = Router;

})(this);
