(function( global ) {

    utils = function() {
    };

    /**
     * Performs a query to the database
     *
     * data and method are optional parameters, which default to ``null``
     * respectively `"GET"``. The contentType defaults to ``application/json``.
     *
     * @param string url
     * @param function callback
     * @param string data
     * @param string method
     * @param string contentType
     */
    utils.query = function( url, callback, data, method, contentType, error )
    {
        var data   = data || null;
        var method = method || "GET";
        var contentType = contentType || "application/json";
        var error = error || function( request, textStatus, error ) {
            var result = JSON.parse( request.responseText );
            alert( "Error: " + result.reason );
            throw( result );
        };

        $.ajax( {
            type: method,
            url: url,
            data: data,
            success: callback,
            error: error,
            dataType: "json",
            contentType: contentType,
        } );
    }

    /**
     * Performs a query to the database API
     *
     * data and method are optional parameters, which default to ``null``
     * respectively `"GET"``.
     *
     * @param string url
     * @param function callback
     * @param string data
     * @param string method
     */
    utils.queryApi = function( url, callback, data, method )
    {
        utils.query( "/lounge" + url, callback, data, method, "application/json" );
    }

    /**
     * Converts a Html form element into a key value array with the form
     * properties
     *
     * @param HtmlFormElement form
     * @return Object
     */
    utils.formToObject = function( form )
    {
        var rows = $( form ).serializeArray();
        var data = {};
        $.each( rows, function( key, row )
            {
                data[row.name] = row.value;
            }
        );

        return data;
    }

    /**
     * Format a timestamp
     *
     * Currently returns a full localized date string, since this i the only
     * simple readable JavaScript date lib output.
     *
     * @param int timestamp
     * @return string
     */
    utils.formatTime = function( timestamp )
    {
        var time = new Date();
        time.setTime( timestamp );
        return time.toLocaleString();
    }

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.utils = utils;

})(this);
