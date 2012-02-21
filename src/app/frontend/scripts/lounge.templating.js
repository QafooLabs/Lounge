/**
 * Templating; Show a template
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.templating = function( templates )
    {
        var templateCache = {};
        var defaultTemplates = {
            "/start":    "start.tpl",
        };

        templates = $.extend( defaultTemplates, templates );

        var setTemplate = function( e, data )
        {
            // Replace content with spinner loading indicator
            $( e.target ).html(
                "<h2>Loading</h2><img src=\"/images/spinner.gif\" alt=\"Loading…\" />"
            );

            showTemplate(
                e.target,
                templates[data.template] || "error.tpl",
                data.viewData || {},
                data.success || null
            );
        };

        var setPartial = function( e, data )
        {
            showTemplate( data.target, data.template, data.viewData || {} );
        };

        var showTemplate = function( target, template, viewData, success )
        {
            ( function()
            {
                if ( templateCache[template] )
                {
                    var deferred = new jQuery.Deferred();
                    deferred.resolve( templateCache[template] );
                    return deferred.promise();
                }

                return $.get( "/templates/" + template);
            }() ).then( function( templateData )
            {
                templateCache[template] = templateData;

                $( target ).html(
                    Mustache.to_html( templateData, viewData )
                );

                $( target ).find( "a" ).not( "[href^=\"http\"]" ).click( function() {
                    var href = $(this).attr( "href" );
                    History.pushState( null, null, href );
                    return false;
                } );

                // call optional success function after completion
                if ( success )
                {
                    success();
                }
            } );
        }

        return this.each( function()
        {
            $(this).bind( "updateContents", setTemplate );
            $(this).bind( "updatePartial", setPartial );
        } );
    };
}( jQuery ) );
