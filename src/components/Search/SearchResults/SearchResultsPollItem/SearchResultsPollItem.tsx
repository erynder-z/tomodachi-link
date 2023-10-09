import { Link } from 'react-router-dom';
import { SearchResultPollType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery ';
import { MdPieChartOutlined } from 'react-icons/md';

type SearchResultsPollItemType = {
    itemData: SearchResultPollType;
    queryString: string;
};

export default function SearchResultsPollItem({
    itemData,
    queryString,
}: SearchResultsPollItemType) {
    const { question, description } = itemData;
    const pollText = `${question} ${description}`;

    return (
        <Link
            to="/"
            className="flex justify-between w-full py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg text-xs md:text-base"
        >
            <div className="flex justify-center gap-4">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {getExcerptWithHighlightedQuery(pollText, queryString)}
                </div>
            </div>
            <div>
                <MdPieChartOutlined
                    size="1.25em"
                    className="text-amber-700 dark:text-amber-400"
                />
            </div>
        </Link>
    );
}
