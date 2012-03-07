<h2>User list</h2>

<ul class="users">
{{#users}}
     <li>
        <a class="button" href="/user/delete/{{id}}"><img src="/images/user_delete.png" width="16px" height="16px" alt="Delete user" /></a>
        <a class="button" href="/user/edit/{{id}}"><img src="/images/user_edit.png" width="16px" height="16px" alt="Edit user" /></a>
        <a href="/user/{{id}}">{{id}}</a>
     </li>
{{/users}}
</ul>
