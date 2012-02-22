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

                var request = {
                    matched: identifier,
                    url:     url
                };
                $( window ).trigger( "route", request );
                $( window ).trigger( "route:" + identifier, request );
                return false;
            }
        } );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.Router = Router;

})(this);
