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

        var register = function( e, data )
        {
            var salt = "someSalt-betterUseSomethingRandomHere";
            var user = {
                _id: "org.couchdb.user:" + data.name,
                name: data.name,
                type: "user",
                salt: salt,
                password_sha: hex_sha1( data.password + salt ),
                roles: [],
            }

            // Register user in CouchDBs user database
            Lounge.utils.query(
                "/_users/" + user._id,
                function( data, textStatus, request ) {
                    alert( "You are now registered." );
                },
                JSON.stringify( user ),
                "PUT"
            );

            return false;
        };

        var login = function( e, data )
        {
            Lounge.utils.query(
                "/_session",
                function( data, textStatus, request ) {
                    // Create user document, after successful login
                    Lounge.utils.query(
                        "/lounge/user-" + data.name,
                        null,
                        JSON.stringify( {
                            _id:  'user-' + data.name,
                            name: data.name,
                            type: "user"
                        } ),
                        "PUT",
                        "application/json",
                        function () {} // Hack: Ignore failures, since this is likely just the conflict on the second try.
                    );

                    $( e.target ).trigger( "checkLogin" );
                },
                {   "name":     data.name,
                    "password": data.password,
                },
                "POST",
                "application/x-www-form-urlencoded"
            );
            
            return false;
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
            $(this).bind( "register", register );
            $(this).bind( "login", login );
            $(this).bind( "logout", logout );
        } );
    };
}( jQuery ) );
