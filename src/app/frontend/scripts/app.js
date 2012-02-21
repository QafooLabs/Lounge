(function( global ) {

    App = function() {
        var app = this;
        $( window ).bind( "route:main", function( event, data ) {
            app.initMain( data );
        } );
    };

    /**
     * Initilize application depending on matched path. Since different pages
     * have different application configuration / use differen application
     * widgets.
     *
     * @param string url
     */
    App.prototype.initMain = function( url ) {
        console.log( url );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.App = App;

})(this);
