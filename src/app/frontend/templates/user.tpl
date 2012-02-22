<h2>Tweets from {{user}}</h2>

<ul class="tweets">
{{#tweets}}
    <li class="tweet">
        <span class="text">{{text}}</span>
        <span class="annotations">
            at <span class="time">{{time}}</span>
        </span>
    </li>
{{/tweets}}
</ul>
