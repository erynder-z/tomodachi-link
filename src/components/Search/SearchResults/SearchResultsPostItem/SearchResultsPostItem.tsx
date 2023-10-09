import { Link } from 'react-router-dom';
import { SearchResultPostType } from '../../../../types/searchTypes';

type SearchResultsPostItemType = {
    itemData: SearchResultPostType;
    queryString: string;
};

export default function SearchResultsPostItem({
    itemData,
    queryString,
}: SearchResultsPostItemType) {
    const { text } = itemData;

    const getTextExcerpt = (text: string, queryString: string) => {
        const queryIndex = text
            .toLowerCase()
            .indexOf(queryString?.toLowerCase());
        if (queryIndex === -1) {
            // If the queryString is not found in the text, return the first 35 characters.
            return text.substring(0, 35) + '...';
        } else {
            const start = Math.max(0, queryIndex - 17); // 17 characters before and after queryString
            const end = Math.min(text.length, start + 35); // 35 characters in total

            // Extract the substring centered around the queryString.
            const excerpt = text.substring(start, end);

            // Split the excerpt into parts: before, matched, and after the query.
            const beforeQuery = excerpt.substring(0, queryIndex - start);
            const matchedQuery = excerpt.substring(
                queryIndex - start,
                queryIndex - start + queryString.length
            );
            const afterQuery = excerpt.substring(
                queryIndex - start + queryString.length
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

    return (
        <Link
            to="/"
            className="flex justify-between w-full py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg text-xs md:text-base"
        >
            <div className="flex justify-center gap-4">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {getTextExcerpt(text, queryString)}
                </div>
            </div>
            <div>Post</div>
        </Link>
    );
}
