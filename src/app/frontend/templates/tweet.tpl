{{#tweet}}
<div class="tweet">
    <span class="text">{{text}}</span>
    <span class="annotations">
        by <a class="user" onclick="userController.showUser( '{{user}}' );" href="#user-{{user}}">{{user}}</a>
        at <a class="time" onclick="tweetController.showTweet( '{{_id}}' );" href="#tweet-{{_id}}">{{time}}</a>
    </span>
</div>
{{/tweet}}
