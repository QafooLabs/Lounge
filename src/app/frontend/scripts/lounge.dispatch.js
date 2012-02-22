/**
 * Dispatcher: Configurable event dispatcher
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.dispatch = function( source, node, target, converter, filter, stopPropagation )
    {
        var routes = [];

        var dispatchEvent = function( e, eventData )
        {
            if ( !routes[e.type] )
            {
                return false;
            }

            eventData = eventData || {};
            $.each( routes[e.type], function ( index, callback )
            {
                // Convert event data, if a converter is available
                var convertedEventData = eventData;
                if ( callback.converter )
                {
                    convertedEventData = callback.converter( eventData );
                }

                // Optionally filter events
                if ( callback.filter &&
                     !callback.filter( e, node, convertedEventData ) )
                {
                    return;
                }

                console.log( "Dispatching event " + e.type + " to " + node + ":" + callback.target );
                $( node ).trigger( callback.target, convertedEventData );
            } );

            if ( stopPropagation = stopPropagation || false ) {
                console.log( "Force-stopped event propagation." );
                e.stopPropagation();
            }
            return !stopPropagation;
        };

        return this.each( function()
        {
            target = target || source;

            if ( !routes[source] )
            {
                console.log( "Bind " + source + " to " + node + ":" + target );
                $(this).bind( source + ".dispatcher", dispatchEvent );
                routes[source] = [];
            }

            $.fn.dispatch.sources.push( this );
            routes[source].push( {
                target:    target,
                converter: converter || null,
                filter:    filter || null
            } );
        } );
    };

    $.fn.dispatch.sources = [];
}( jQuery ) );
