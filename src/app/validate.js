function ( newDoc, oldDoc, userContext ) {

    if ( newDoc.type === "user" ) {
        // Allow all user documents to be created -- on login for example.
        return;
    }

    if ( !userContext.name ) {
        throw ( { forbidden: "Please login first." } );
    }

    if ( newDoc.user !== userContext.name ) {
        throw ( { unauthorized: "You may only edit your own documents." } );
    }
}
