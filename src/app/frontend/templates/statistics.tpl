<h2>Tweet statistics</h2>

<dl>
{{#statistics}}
    <dt>{{date}}</dt>
    <dd>{{count}}</dd>
{{/statistics}}
</dl>

<p>
    Group by:
    <a onclick="tweetController.statistics( 1 );" href="#statistics">Year</a>
    <a onclick="tweetController.statistics( 2 );" href="#statistics">Month</a>
    <a onclick="tweetController.statistics( 3 );" href="#statistics">Day</a>
    <a onclick="tweetController.statistics( 4 );" href="#statistics">Hour</a>
    <a onclick="tweetController.statistics( 5 );" href="#statistics">Minute</a>
    <a onclick="tweetController.statistics( 6 );" href="#statistics">Second</a>
</p>
