(function( global ) {

    utils = function() {
    };

    /**
     * Performs a query to the database
     *
     * data and method are optional parameters, which default to ``null``
     * respectively `"GET"``.
     *
     * @param string url
     * @param function callback
     * @param string data
     * @param string method
     */
    utils.query = function( url, callback, data, method )
    {
        var data   = ( data   === undefined ) ? null : data;
        var method = ( method === undefined ) ? "GET" : method;

        $.ajax( {
            type: method,
            url: "/api" + url,
            data: data,
            success: callback,
            error: function( request, textStatus, error )
                {
                    var result = JSON.parse( request.responseText );
                    alert( "Error loggin in: " + result.reason );
                    throw( result );
                },
            dataType: "json",
            contentType: "application/json",
        } );
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
