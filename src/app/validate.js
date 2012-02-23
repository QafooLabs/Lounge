function ( newDoc , oldDoc , userContext ) {
    if ( !userContext . name ) {
        throw ( { forbidden: "Please login first." } );
    }

    if ( newDoc.user !== userContext.name ) {
        throw ( { unauthorized: "You may only edit your own documents." } );
    }
}
