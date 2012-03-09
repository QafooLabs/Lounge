<h2>Timeline</h2>

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
                <button class="comment small white radius button" value="{{_id}}" href="/comment/{{_id}}">Comment</button>
            </div>
        </div>
        <ul class="comments">
        {{#comments}}
            <li>
                <p>{{text}}</p>
                <div class="annotations">
                    by {{user}} <span class="rating">({{rating}} / 5)</span>
                </div>
            </li>
        {{/comments}}
        </ul>
    </li>
{{/tweets}}
</ul>
