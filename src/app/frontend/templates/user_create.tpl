<form onsubmit="return userController.{{target}};">
{{#data}}
<fieldset>
    <legend>Create user</legend>
    <input type="text" name="username" value="{{username}}" />
    <input type="password" name="password" value="{{password}}" />
    <input type="text" name="prename" value="{{prename}}" />
    <input type="text" name="surname" value="{{surname}}" />
    <input type="submit" value="Save" />
</fieldset>
{{/data}}
</form>
