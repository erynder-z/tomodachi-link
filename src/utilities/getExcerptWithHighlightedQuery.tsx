export const getExcerptWithHighlightedQuery = (
    text: string,
    query: string,
    maxLength = 35
) => {
    const queryIndex = text?.toLowerCase().indexOf(query?.toLowerCase());
    if (queryIndex === -1) {
        // If the query is not found in the text, return the first maxLength characters.
        return text?.substring(0, maxLength) + '...';
    } else {
        const start = Math.max(0, queryIndex - 17); // 17 characters before and after query
        const end = Math.min(text?.length, start + maxLength); // maxLength characters in total

        // Extract the substring centered around the query.
        const excerpt = text?.substring(start, end);

        // Split the excerpt into parts: before, matched, and after the query.
        const beforeQuery = excerpt?.substring(0, queryIndex - start);
        const matchedQuery = excerpt?.substring(
            queryIndex - start,
            queryIndex - start + query?.length
        );
        const afterQuery = excerpt?.substring(
            queryIndex - start + query?.length
        );

        return (
            <>
                {start > 0 && '...'}
                {beforeQuery}
                <mark>{matchedQuery}</mark>
                {afterQuery}
                ...
            </>
        );
    }
};
