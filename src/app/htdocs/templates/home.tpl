<h2>Timeline</h2>

<ul class="tweets">
{{#tweets}}
    <li class="tweet">
        <div class="row">
            <div class="twelve columns">
                <p>{{{text}}}</p>
            </div>
        </div>
        <div class="row">
            <div class="ten columns annotations">
                by <a class="user" href="/user/{{user}}">{{user}}</a>
                at <a class="time" href="/tweet/{{_id}}">{{formattedTime}}</a>
                ({{comments}} comments, {{rating}} / 5)
            </div>
            <div class="two columns actions">
                <button class="comment small white radius button" value="{{_id}}">Comment</button>
            </div>
        </div>
    </li>
{{/tweets}}
</ul>
