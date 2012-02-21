{{#user}}
<h2>{{prename}} {{surname}}</h2>
<dl>
    <dt>Username</dt>
    <dd>{{username}}</dd>
</dl>
{{/user}}

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
