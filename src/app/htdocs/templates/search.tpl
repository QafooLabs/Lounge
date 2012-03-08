<h2>Search results for &quot;{{phrase}}&quot;</h2>

<ul class="search">
{{#tweets}}
    <li class="tweet">
        <span class="text">{{text}}</span>
        <span class="annotations">
            by <a class="user" href="/user/{{user}}">{{user}}</a>
            at <a class="time" href="/tweet/{{_id}}">{{formattedTime}}</a>
        </span>
    </li>
{{/tweets}}
{{^tweets}}
    <li><p>No tweets found.</p></li>
{{/tweets}}
</ul>
