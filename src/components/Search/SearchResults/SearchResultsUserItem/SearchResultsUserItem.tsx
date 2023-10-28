import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { SearchResultUserType } from '../../../../types/searchTypes';
import { MdOutlineAccountBox } from 'react-icons/md';
import { motion } from 'framer-motion';

type SearchResultsUserListItem = {
    itemData: SearchResultUserType;
};

export default function SearchResultsUserListItem({
    itemData,
}: SearchResultsUserListItem) {
    const { _id, firstName, lastName, userpic } = itemData || {};

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className=" w-full py-2  rounded lg:rounded-lg text-sm md:text-base"
        >
            <Link
                to={`/users/${_id}`}
                className="flex justify-between text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <div className="flex justify-center gap-4">
                    <img
                        loading="lazy"
                        className="w-8 h-8 object-cover rounded-full"
                        src={`data:image/png;base64,${getCorrectUserpicFormat(
                            userpic
                        )}`}
                        alt="User avatar"
                    />
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {firstName} {lastName}
                    </div>
                </div>
                <div>
                    <MdOutlineAccountBox
                        size="1.25em"
                        className="text-sky-700 dark:text-sky-400"
                    />
                </div>
            </Link>
        </motion.button>
    );
}
