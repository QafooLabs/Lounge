function( doc, request ) {
    var Lounge = {
        Html: require( "modules/html" ).Html,
    };

    if ( !doc ) {
        return {
            code: 404,
            body: Lounge.Html.show404(),
        }
    }

    return {
        body: Lounge.Html.header( "Tweet" ) +
            "<h2>" + doc.text + "</h2>" +
            "<p>by " + doc.user + "</p>" +
            Lounge.Html.footer(),
    }
}
