<h2>Search results</h2>

<ul class="search">
{{#results}}
    <li class="tweet">
    {{#tweet}}
        <span class="text">{{text}}</span>
        <span class="annotations">
            by <a class="user" href="/user/{{user}}">{{user}}</a>
            at <a class="time" href="/tweet/{{_id}}">{{time}}</a>
        </span>
    {{/tweet}}
    </li>
{{/results}}
</ul>
