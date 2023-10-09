import { Link } from 'react-router-dom';
import { SearchResultPostType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery ';

type SearchResultsPostItemType = {
    itemData: SearchResultPostType;
    queryString: string;
};

export default function SearchResultsPostItem({
    itemData,
    queryString,
}: SearchResultsPostItemType) {
    const { text } = itemData;

    return (
        <Link
            to="/"
            className="flex justify-between w-full py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg text-xs md:text-base"
        >
            <div className="flex justify-center gap-4">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {getExcerptWithHighlightedQuery(text, queryString)}
                </div>
            </div>
            <div>Post</div>
        </Link>
    );
}
