import { Link } from 'react-router-dom';
import { SearchResultPollType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery';
import { MdPieChartOutlined } from 'react-icons/md';
import { motion } from 'framer-motion';

type SearchResultsPollItemType = {
    itemData: SearchResultPollType;
    queryString: string;
};

/**
 * React component for rendering a search result item for polls.
 *
 * @component
 * @param {SearchResultsPollItemType} props - The component props.
 * @param {SearchResultPollType} props.itemData - Data for the search result poll item.
 * @param {string} props.queryString - The search query string for highlighting.
 * @returns {JSX.Element} The rendered SearchResultsPollItem component.
 */
export default function SearchResultsPollItem({
    itemData,
    queryString,
}: SearchResultsPollItemType): JSX.Element {
    const { _id, question, description } = itemData;
    const pollText = `${question} ${description}`;

    /**
     * Render the SearchResultsPollItem component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="group w-full py-2  rounded lg:rounded-lg text-sm md:text-base"
        >
            <Link
                to={`/poll/${_id}`}
                className="flex justify-between text-regularText dark:text-regularTextDark group-hover:text-highlight dark:group-hover:text-highlightDark duration-300"
            >
                <div className="flex justify-between gap-4 w-5/6">
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {getExcerptWithHighlightedQuery(pollText, queryString)}
                    </div>
                </div>
                <div>
                    <MdPieChartOutlined
                        size="1.25em"
                        className="text-amber-700 dark:text-amber-400 group-hover:text-highlight dark:group-hover:text-highlightDark duration-300"
                    />
                </div>
            </Link>
        </motion.button>
    );
}
