import { Link } from 'react-router-dom';
import { SearchResultPostType } from '../../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../../utilities/getExcerptWithHighlightedQuery';
import { MdOutlineArticle } from 'react-icons/md';
import { motion } from 'framer-motion';

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
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="group w-full py-2  rounded lg:rounded-lg text-sm md:text-base"
        >
            <Link
                to={`/post/${_id}`}
                className="flex justify-between text-regularText dark:text-regularTextDark group-hover:text-highlight dark:group-hover:text-highlightDark duration-300"
            >
                <div className="flex justify-between gap-4 w-5/6">
                    <div className="truncate">
                        {getExcerptWithHighlightedQuery(text, queryString)}
                    </div>
                </div>
                <div>
                    <MdOutlineArticle
                        size="1.25em"
                        className="text-lime-700 dark:text-lime-400 group-hover:text-highlight dark:group-hover:text-highlightDark duration-300"
                    />
                </div>
            </Link>
        </motion.button>
    );
}
