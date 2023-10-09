import { Link } from 'react-router-dom';
import { SearchResultPollType } from '../../../../types/searchTypes';

type SearchResultsPollItemType = {
    itemData: SearchResultPollType;
    queryString: string;
};

export default function SearchResultsPollItem({
    itemData,
    queryString,
}: SearchResultsPollItemType) {
    const { question, description } = itemData;

    const getTextExcerpt = () => {
        // Function to extract and highlight the matching query string.
        const text = `${question} ${description}`; // Combine question and description
        const query = queryString.toLowerCase();
        const textLower = text.toLowerCase();
        const queryIndex = textLower.indexOf(query);

        if (queryIndex === -1) {
            // If the query is not found in the text, return the first 35 characters.
            return text.substring(0, 35) + '...';
        } else {
            const start = Math.max(0, queryIndex - 17); // 17 characters before and after query
            const end = Math.min(text.length, start + 35); // 35 characters in total

            // Extract the substring centered around the query.
            const excerpt = text.substring(start, end);

            // Split the excerpt into parts: before, matched, and after the query.
            const beforeQuery = excerpt.substring(0, queryIndex - start);
            const matchedQuery = excerpt.substring(
                queryIndex - start,
                queryIndex - start + query.length
            );
            const afterQuery = excerpt.substring(
                queryIndex - start + query.length
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
                    {getTextExcerpt()}
                </div>
            </div>
            <div>Poll</div>
        </Link>
    );
}
