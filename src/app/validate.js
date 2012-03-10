function ( newDoc, oldDoc, userContext ) {

    if ( !userContext.name ) {
        throw ( { forbidden: "Please login first." } );
    }

    if ( ( newDoc.type === "user" ) &&
         ( newDoc.name === userContext.name ) ) {
        return;
    }

    if ( newDoc.user !== userContext.name ) {
        throw ( { unauthorized: "You may only edit your own documents." } );
    }
}
