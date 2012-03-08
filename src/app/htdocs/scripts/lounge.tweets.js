/**
 * Tweet component
 *
 * Copyright (c) 2011 Qafoo GmbH
 * Dual licensed under the MIT and GPL licenses.
 */
;( function( $ ) {
    $.fn.tweets = function()
    {
        var user = null;

        var loadTweets = function( e, eventData )
        {
            if ( !user ) {
                return;
            }

            Lounge.utils.queryApi(
                "/_design/app/_view/home?descending=true&include_docs=true",
                function( data, textStatus, request ) {
                    var i;
                    var tweet = 0;
                    var tweets = [];
                    var tweetIndex = {};
                    for ( i in data.rows ) {
                        if ( data.rows[i].doc.type === "tweet" ) {
                            if ( !tweetIndex[data.rows[i].doc._id] ) {
                                tweetIndex[data.rows[i].doc._id] = tweet++;
                            }

                            data.rows[i].doc.comments = [];
                            tweets[tweetIndex[data.rows[i].doc._id]] = data.rows[i].doc;
                        }

                        if ( data.rows[i].doc.type === "comment" ) {
                            tweets[tweetIndex[data.rows[i].doc.tweet]].comments.push( data.rows[i].doc );
                        }
                    }

                    console.log( tweets );
                    $( e.target ).trigger( "showTweets", [tweets] );
                }
            );
        };

        var tweetsByUser = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/tweets_per_user?descending=true&include_docs=true",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweetsByUser", [data.rows] );
                }
            );
        };

        var show = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/" + eventData,
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweet", [data] );
                }
            );
        };

        var loadStatistics = function( e, eventData )
        {
            var groupLevel = eventData.groupLevel || 5;
            Lounge.utils.queryApi(
                "/_design/app/_view/statistics?group_level=" + groupLevel,
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweetStatistics", [{
                        groupLevel: groupLevel,
                        statistics: data.rows
                    }] );
                }
            );
        };

        var tweet = function( e, eventData )
        {
            // Submit tweet to database
            var now = new Date();
            Lounge.utils.queryApi(
                "/",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "tweeted" );
                },
                JSON.stringify( {
                    type: "tweet",
                    text: eventData.tweet,
                    user: user,
                    time: now.getTime(),
                } ),
                "POST"
            );
        };

        var setTwitterUser = function( e, eventData ) {
            user = eventData;
        }

        var search = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/search?key=" + JSON.stringify( eventData ),
                function( data, textStatus, request ) {
                    var results = data.rows[0] ? data.rows[0].value : [];
                    var docs = {keys: []};

                    for ( var docID in results ) {
                        docs.keys.push( docID );
                    }

                    Lounge.utils.queryApi(
                        "/_all_docs?include_docs=true",
                        function( data, textStatus, request ) {
                            var searchResults = [];
                            $.each( data.rows, function ( key, value ) {
                                value.doc.scrore = results[value.doc._id];
                                searchResults.push( value.doc );
                            } );
                            $( e.target ).trigger( "tweetSearchResults", {
                                phrase:  eventData,
                                results: searchResults
                            } );
                        },
                        JSON.stringify( docs ),
                        "POST"
                    );
                }
            );
        };

        var comment = function( e, eventData )
        {
            var now = new Date();
            Lounge.utils.queryApi(
                "/",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "commented" );
                },
                JSON.stringify( {
                    type:      "comment",
                    tweet:     eventData.tweet,
                    tweetTime: parseInt( eventData.time, 10 ),
                    text:      eventData.comment,
                    rating:    eventData.rating,
                    user:      user,
                    time:      now.getTime(),
                } ),
                "POST"
            );

            return false;
        }

        return this.each( function()
        {
            $(this).bind( "loadTweets", loadTweets );
            $(this).bind( "tweetStatistics", loadStatistics );
            $(this).bind( "setTwitterUser", setTwitterUser );
            $(this).bind( "tweet", tweet );
            $(this).bind( "searchTweets", search );
            $(this).bind( "tweetsByUser", tweetsByUser );
            $(this).bind( "singleTweet", show );
            $(this).bind( "comment", comment );
        } );
    };
}( jQuery ) );
