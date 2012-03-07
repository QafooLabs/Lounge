/**
 * User login handling
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.user = function()
    {
        var templateCache = {};

        var checkLogin = function( e, data )
        {
            Lounge.utils.query( "/_session", function( data, textStatus, request )
            {
                // Check if the user is already logged in
                var userContext  = data.userCtx;
                if ( !userContext.name )
                {
                    $( e.target ).trigger( "statusLoggedOut", [data] );
                }
                else
                {
                    $( e.target ).trigger( "statusLoggedIn", [data] );
                }
            } );
        };

        var login = function( e, data )
        {
            Lounge.utils.query(
                "/_session",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "checkLogin" );
                },
                {   "name":     data.user,
                    "password": data.password,
                },
                "POST",
                "application/x-www-form-urlencoded"
            );
        };

        var logout = function( e, data )
        {
            Lounge.utils.query(
                "/_session",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "checkLogin" );
                },
                null,
                "DELETE"
            );

            return false;
        };

        return this.each( function()
        {
            $(this).bind( "checkLogin", checkLogin );
            $(this).bind( "login", login );
            $(this).bind( "logout", logout );
        } );
    };
}( jQuery ) );
