(function( global ) {

    var Html = function() {
    }

    Html.header = function( title ) {
        return "<html>" + 
            "<head>" + 
            '<link rel="Stylesheet" type="text/css" href="/styles/screen.css" media="screen" />' + 
            "<title>Lounge</title>" + 
            "</head><body><h1>" + title + "</h1><div id=\"content\">";
    };

    Html.showTweet = function( tweet ) {
        return "<li><strong><a href=\"/static/s/tweet/" + tweet._id + "\">" + tweet.text + "</a></strong> by " + tweet.user + "</li>";
    }

    Html.footer = function() {
        return "</div></body></html>";
    };

    Html.show404 = function() {
        return this.header( "Not found" ) + this.footer();
    }

    global.Html = Html;

})(exports);
