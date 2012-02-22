<h2>Search results</h2>

<ul class="search">
{{#tweets}}
    <li class="tweet">
        <span class="text">{{text}}</span>
        <span class="annotations">
            by <a class="user" href="/user/{{user}}">{{user}}</a>
            at <a class="time" href="/tweet/{{_id}}">{{time}}</a>
        </span>
    </li>
{{/tweets}}
{{^tweets}}
    <li><p>No tweets found.</p></li>
{{/tweets}}
</ul>
