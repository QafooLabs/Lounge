(function( global ) {

    App = function() {
        var app = this;

        $( window ).user();
        $( '#content' ).templating();
        $( '#content' ).tweets();
        $( '#navigation' ).markCurrent( {
            "main":       "viewTimeline",
            "statistics": "statistics",
        } );

        // General content handling
        $( window ).bind( "contentLoaded", function ( e, target ) {
            $( target ).find( "input").each( function() {
                this.defaultValue = this.value;

                $(this).bind( "focus", function () {
                    if ( this.value == this.defaultValue ) {
                        $(this).val( "" );
                    }
                } );

                $(this).bind( "blur", function () {
                    if ( this.value == "" ) {
                        $(this).val( this.defaultValue );
                    }
                } );
            } );

            $( target ).find( "a" ).not( "[href^=\"http\"]" ).bind( "click", function() {
                History.pushState( null, null, $(this).attr( "href" ) );
                return false;
            } );
        } );

        // Search form handling
        $( "#search" ).bind( "submit", function() {
            History.pushState( null, null, "/search" + "?phrase=" + $( '#search input[name="phrase"]' ).val() );
            return false;
        } );

        $( window ).bind( "route", app.initAppBase );
        $( window ).bind( "route:404", app.showNotFound );
        $( window ).bind( "route:main", app.initMain );
        $( window ).bind( "route:statistics", app.initStatistics );
        $( window ).bind( "route:search", app.initSearch );
        $( window ).bind( "route:user", app.showUser );
        $( window ).bind( "route:tweet", app.showTweet );

        $( window ).trigger( "checkLogin" );
    };

    /**
     * Initialize general application configuration
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initAppBase = function( event, request ) {

        // Reset all singals on "startup"
        $( $.fn.dispatch.sources ).unbind( ".dispatcher" );
        $.fn.dispatch.sources = [];

        // Global tweet form handling
        $( '#content' ).dispatch( "tweeted", '#twitter', 'reset' );
        $( '#twitter' ).dispatch( "submit", '#content', 'tweet', function ( data ) {
            return Lounge.utils.formToObject( '#twitter' );
        }, null, true );

        // Mark current selected tab as selected
        $( '#navigation' ).trigger( "markCurrentLink", [request.matched] );

        // Global login form handling
        $( window ).dispatch( "statusLoggedOut", '#content', 'setTwitterUser', function ( data ) {
            return null;
        } );
        $( window ).dispatch( "statusLoggedOut", '#content', 'updatePartial', function ( data ) {
            return {
                target:   '#content',
                template: 'logout.tpl',
                viewData: data.userCtx,
                success:  function() {
                    $( "#login" ).dispatch( "submit", window, "login", function ( data ) {
                        return Lounge.utils.formToObject( "#login" );
                    }, null, true );

                    $( "#register" ).dispatch( "submit", window, "register", function ( data ) {
                        return Lounge.utils.formToObject( "#register" );
                    }, null, true );
                }
            }
        } );
        $( window ).dispatch( "statusLoggedIn", '#content', 'setTwitterUser', function ( data ) {
            return data.userCtx.name;
        } );
        $( window ).dispatch( "statusLoggedIn", '#content', 'updatePartial', function ( data ) {
            return {
                target:   '#user',
                template: 'login.tpl',
                viewData: data.userCtx,
                success:  function() {
                    $( "#userLogout" ).unbind( "click" );
                    $( "#userLogout" ).dispatch( "click", window, "logout", null, null, true );
                }
            }
        } );

        // Init tweet handling
        $( '#content' ).dispatch( "tweeted", '#content', 'loadTweets' );
        $( '#content' ).dispatch( "commented", '#content', 'loadTweets' );
        $( '#content' ).dispatch( "showTweets", '#content', 'updateContents', function ( data ) {
            return {
                template: "home.tpl",
                viewData: {
                    tweets: $.map( data, function( tweet ) {
                        tweet.formattedTime = Lounge.utils.formatTime( tweet.time );
                        return tweet;
                    } )
                },
                success: function () {
                    $( ".tweet .comment" ).bind( "click", function( e ) {
                        $( "#content" ).trigger( "updatePartial", {
                            target:   '#dialog',
                            template: 'createComment.tpl',
                            viewData: {tweet: $( e.target).val()},
                            success:  function() {
                                $( '#dialog' ).dialog( {
                                    draggable: false,
                                    modal: true,
                                    title: "Add comment",
                                    buttons: {
                                        Comment: function() {
                                            $( this ).dialog( "close" );
                                            $( "#content" ).trigger( "comment", [
                                                Lounge.utils.formToObject( "#dialog form" )
                                            ] );
                                        }
                                    }
                                } );
                            }
                        } );

                        e.stopPropagation();
                        return false;
                    } );
                }
            }
        } );

        // Show tweets after user logged in
        $( window ).dispatch( "statusLoggedIn", '#content', 'loadTweets' );
    };

    /**
     * Show not found result for unmatched routes
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.showNotFound = function( event, request ) {
        $( '#content' ).trigger( 'updateContents', {
            template: "404.tpl",
        } );
    };

    /**
     * Initialize main tweet view of application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initMain = function( event, request ) {
        $( '#content' ).trigger( "loadTweets" );
    };

    /**
     * Initialize statsitics view of application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initStatistics = function( event, request ) {
        $( '#content' ).dispatch( "showTweetStatistics", '#content', 'updateContents', function ( data ) {
            return {
                template: "statistics.tpl",
                viewData: {
                    "level":      data.groupLevel,
                    "statistics": $.map( data.statistics, function( row )
                        {
                            var date = row.key.slice( 0, 3 ).reverse().join( "." );
                            if ( row.key[3] )
                            {
                                date += " " + row.key[3] +
                                    ( row.key[4] ? ":" + row.key[4] : ":00" ) +
                                    ( row.key[5] ? "." + row.key[5] : "" );
                            }

                            return {
                                "date": date,
                                "count": row.value,
                            }
                        }
                    ),
                }
            }
        } );
        $( '#content' ).trigger( "tweetStatistics", [{
            groupLevel: request.url.params.groupLevel || 5
        }] );
    };

    /**
     * Handle search view
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initSearch = function( event, request ) {
        $( '#content' ).trigger( "searchTweets", [
            request.url.params.phrase || ""
        ] );
        $( '#content' ).dispatch( "tweetSearchResults", '#content', 'updateContents', function ( data ) {
            $( '#search input[name="phrase"]' ).val( data.phrase );
            return {
                template: "search.tpl",
                viewData: {
                    phrase: data.phrase,
                    tweets: $.map( data.results, function( tweet ) {
                        tweet.formattedTime = Lounge.utils.formatTime( tweet.time );
                        return tweet;
                    } )
                }
            }
        } );
    };

    /**
     * Show a single user
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.showUser = function( event, request ) {
        $( '#content' ).trigger( "tweetsByUser", [
            request.url.params.match
        ] );
        $( '#content' ).dispatch( "showTweetsByUser", '#content', 'updateContents', function ( data ) {
            return {
                template: "user.tpl",
                viewData: {
                    user: request.url.params.match,
                    tweets: $.map( data, function( value ) {
                        var tweet = value.doc;
                        tweet.formattedTime = Lounge.utils.formatTime( tweet.time );
                        return tweet;
                    } )
                }
            }
        } );
    };

    /**
     * Show a single tweet
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.showTweet = function( event, request ) {
        $( '#content' ).trigger( "singleTweet", [
            request.url.params.match
        ] );
        $( '#content' ).dispatch( "showTweet", '#content', 'updateContents', function ( data ) {
            data.formattedTime = Lounge.utils.formatTime( data.time );
            return {
                template: "tweet.tpl",
                viewData: {
                    tweet: data,
                }
            }
        } );
    };

    // Exports
    global.Lounge = global.Lounge || {};
    global.Lounge.App = App;

})(this);
