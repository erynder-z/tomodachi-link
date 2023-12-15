import { Link } from 'react-router-dom';
import { SearchResultUserType } from '../../../../types/searchTypes';
import { MdOutlineAccountBox } from 'react-icons/md';
import { motion } from 'framer-motion';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

type SearchResultsUserListItem = {
    itemData: SearchResultUserType;
};

export default function SearchResultsUserListItem({
    itemData,
}: SearchResultsUserListItem) {
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = itemData || {};

    const isCurrentUser = currentUserData?._id === _id;
    const path = isCurrentUser ? '/mypage' : `/users/${_id}`;

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className=" w-full py-2  rounded lg:rounded-lg text-sm md:text-base "
        >
            <Link
                to={path}
                className="flex justify-between text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <div className="flex gap-4 w-5/6">
                    <img
                        loading="lazy"
                        className="w-8 h-8 object-cover rounded-full"
                        src={`data:image/png;base64,${userpic?.data}`}
                        alt="User avatar"
                    />
                    <div className="truncate">
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
