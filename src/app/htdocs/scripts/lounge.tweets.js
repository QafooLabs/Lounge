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

        var linkHash = function( string )
        {
            return string.replace( /(#([A-Za-z0-9_-]+))/g, '<a href="/hash/$2">$1</a>' );
        };

        var loadTweets = function( e, eventData )
        {
            if ( !user ) {
                return;
            }

            Lounge.utils.queryApi(
                "/_design/app/_view/home?descending=true&include_docs=true",
                function( tweets, textStatus, request ) {
                    Lounge.utils.queryApi(
                        "/_design/app/_view/rating?group_level=1",
                        function( ratings, textStatus, request ) {
                            var i;
                            var tweet = 0;
                            var result = [];
                            var resultIndex = {};

                            for ( i in tweets.rows ) {
                                resultIndex[tweets.rows[i].doc._id] = tweet++;
                                tweets.rows[i].doc.text = linkHash( tweets.rows[i].doc.text );
                                result[resultIndex[tweets.rows[i].doc._id]] = tweets.rows[i].doc;
                            }

                            for ( i in ratings.rows ) {
                                result[resultIndex[ratings.rows[i].key[0]]].comments = ratings.rows[i].value.count;
                                result[resultIndex[ratings.rows[i].key[0]]].rating   = ( ratings.rows[i].value.sum / ratings.rows[i].value.count ).toFixed( 1 );
                            }

                            $( e.target ).trigger( "showTweets", [result] );
                        }
                    );
                }
            );
        };

        var tweetsByUser = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/tweets_per_user?descending=true&include_docs=true",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showTweetsByUser", [data.rows.map( function ( value ) {
                        value.doc.text = linkHash( value.doc.text );
                        return value;
                    } )] );
                }
            );
        };

        var hashTags = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/tags?descending=true&include_docs=true&startkey=[\"" + eventData + "\", {}]&endkey=[\"" + eventData + "\"]",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "showHashTags", [data.rows.map( function ( value ) {
                        value.doc.text = linkHash( value.doc.text );
                        return value;
                    } )] );
                }
            );
        };

        var show = function( e, eventData )
        {
            Lounge.utils.queryApi(
                "/" + eventData,
                function( tweet, textStatus, request ) {
                    Lounge.utils.queryApi(
                        "/_design/app/_view/rating?reduce=false&include_docs=true&descending=true&startkey=[\"" + eventData + "\", {}]&endkey=[\"" + eventData + "\"]",
                        function( comments, textStatus, request ) {
                            tweet.comments = comments.rows.map( function( value ) {
                                return value.doc;
                            } );
                            tweet.text = linkHash( tweet.text );
                            $( e.target ).trigger( "showTweet", [tweet] );
                        }
                    );
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
            if ( !user ) {
                alert( "Please login first!" );
            }

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
                                value.doc.text = linkHash( value.doc.text );
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
            $(this).bind( "hashTag", hashTags );
        } );
    };
}( jQuery ) );
