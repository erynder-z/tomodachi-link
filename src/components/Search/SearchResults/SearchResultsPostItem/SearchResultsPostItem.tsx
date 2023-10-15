import { Link } from 'react-router-dom';
import { SearchResultPostType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery';
import { MdOutlineArticle } from 'react-icons/md';

type SearchResultsPostItemType = {
    itemData: SearchResultPostType;
    queryString: string;
};

export default function SearchResultsPostItem({
    itemData,
    queryString,
}: SearchResultsPostItemType) {
    const { _id, text } = itemData;

    return (
        <Link
            to={`/post/${_id}`}
            className="flex justify-between w-full py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg text-xs md:text-base"
        >
            <div className="flex justify-center gap-4">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {getExcerptWithHighlightedQuery(text, queryString)}
                </div>
            </div>
            <div>
                <MdOutlineArticle
                    size="1.25em"
                    className="text-lime-700 dark:text-lime-400"
                />
            </div>
        </Link>
    );
}