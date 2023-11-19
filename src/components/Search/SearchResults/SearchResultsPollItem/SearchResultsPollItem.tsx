import { Link } from 'react-router-dom';
import { SearchResultPollType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery';
import { MdPieChartOutlined } from 'react-icons/md';
import { motion } from 'framer-motion';

type SearchResultsPollItemType = {
    itemData: SearchResultPollType;
    queryString: string;
};

export default function SearchResultsPollItem({
    itemData,
    queryString,
}: SearchResultsPollItemType) {
    const { _id, question, description } = itemData;
    const pollText = `${question} ${description}`;

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className=" w-full py-2  rounded lg:rounded-lg text-sm md:text-base"
        >
            <Link
                to={`/poll/${_id}`}
                className="flex justify-between text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <div className="flex justify-between gap-4 w-5/6">
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
        </motion.button>
    );
}
