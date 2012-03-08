<h2>Timeline</h2>

<ul class="tweets">
{{#tweets}}
    <li class="tweet">
        <span class="text">{{text}}</span>
        <span class="annotations">
            by <a class="user" href="/user/{{user}}">{{user}}</a>
            at <a class="time" href="/tweet/{{_id}}">{{time}}</a>
        </span>
    </li>
{{/tweets}}
</ul>
