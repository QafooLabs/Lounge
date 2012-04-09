(function( global ) {
    "use strict";

    var Router;

    Router = function( routes ) {
        /**
         * Routes
         *
         * @var hash
         */
        this.routes = routes || [];
    };

    /**
     * Initilize application depending on matched path. Since different pages
     * have different application configuration / use differen application
     * widgets.
     *
     * @param string url
     */
    Router.prototype.route = function( url ) {

        jQuery.each( this.routes, function( i, route ) {
            var matches, request;

            matches = url.path.match( route.regexp );
            if ( matches ) {
                console.log( "Matched " + route.regexp + " as route:" + route.name );
                
                if ( matches[1] ) {
                    url.params.match = matches[1];
                }

                request = {
                    matched: route.name,
                    url:     url
                };
                jQuery( window ).trigger( "route", request );
                jQuery( window ).trigger( "route:" + route.name, request );
                return false;
            }
        } );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.Router = Router;

})(this);
