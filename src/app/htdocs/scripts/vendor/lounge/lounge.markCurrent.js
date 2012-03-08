/**
 * Mark current link
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.markCurrent = function( mapping )
    {
        var mapping = mapping || {};

        var markCurrent = function( e, route )
        {
            // Convert all links to sensible JS links
            $( e.target ).find( "a" ).each( function()
            {
                if ( $(this).attr( "id" ) === mapping[route] )
                {
                    $(this).addClass( "active" );
                }
                else
                {
                    $(this).removeClass( "active" );
                }
            } );
        };

        return this.each( function()
        {
            $(this).bind( "markCurrentLink", markCurrent );
        } );
    };
}( jQuery ) );
