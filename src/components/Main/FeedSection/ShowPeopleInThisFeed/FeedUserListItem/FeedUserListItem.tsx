import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { motion } from 'framer-motion';

type FeedUserListItemProps = {
    listItemData: MinimalUserTypes;
};

export default function FeedUserListItem({
    listItemData,
}: FeedUserListItemProps) {
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const isCurrentUser = currentUserData?._id === _id;
    const path = isCurrentUser ? '/mypage' : `/users/${_id}`;

    return (
        <motion.div
            whileTap={{ scale: 0.97 }}
            className="w-full  flex items-center gap-2"
        >
            <Link
                to={path}
                className="group flex items-center w-full gap-4 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg"
            >
                <img
                    loading="lazy"
                    className="w-8 h-8 object-cover rounded-full"
                    src={`data:image/png;base64,${userpic?.data}`}
                    alt="User avatar"
                />
                <div className="hidden md:block w-full truncate text-sm">
                    {firstName} {lastName}
                </div>
            </Link>
        </motion.div>
    );
}
