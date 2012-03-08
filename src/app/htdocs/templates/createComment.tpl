<form id="comment" class="nice">
    <fieldset>
        <legend>Comment</legend>
        <input type="hidden" name="tweet" value="{{tweet}}" />
        <input type="hidden" name="time" value="{{time}}" />
        <textarea name="comment" placeholder="Your comment…"></textarea>
        <label>Rating</label>
        <select name="rating">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select>
    </fieldset>
</form>
