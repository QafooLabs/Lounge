<h2>Tweets for #{{tag}}</h2>

<ul class="tweets">
{{#tweets}}
    <li class="tweet">
        <div class="row">
            <div class="twelve columns">
                <p>{{text}}</p>
            </div>
        </div>
        <div class="row">
            <div class="six columns annotations">
                by <a class="user" href="/user/{{user}}">{{user}}</a>
                at <a class="time" href="/tweet/{{_id}}">{{formattedTime}}</a>
            </div>
            <div class="six columns actions">
                <button class="comment small white radius button" value="{{time}}/{{_id}}" href="/comment/{{_id}}">Comment</button>
            </div>
        </div>
    </li>
{{/tweets}}
</ul>
