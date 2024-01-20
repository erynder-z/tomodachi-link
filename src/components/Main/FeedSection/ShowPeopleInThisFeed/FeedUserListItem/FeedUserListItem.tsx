import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { motion } from 'framer-motion';

type FeedUserListItemProps = {
    listItemData: MinimalUserTypes;
};

/**
 * FeedUserListItem component to display a user in the feed.
 *
 * @component
 * @param {FeedUserListItemProps} props - The props object.
 * @param {MinimalUserTypes} props.listItemData - The data of the user to display.
 * @returns {JSX.Element} The rendered FeedUserListItem component.
 */
export default function FeedUserListItem({
    listItemData,
}: FeedUserListItemProps) {
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const isCurrentUser = currentUserData?._id === _id;
    const path = isCurrentUser ? '/mypage' : `/users/${_id}`;

    /**
     * Rendered FeedUserListItem component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div whileTap={{ scale: 0.97 }} className="flex-1 max-h-12">
            <Link
                to={path}
                className="group flex items-center w-full gap-2 text-xs text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg"
            >
                <img
                    loading="lazy"
                    className="w-6 md:w-8 h-auto object-cover rounded-full"
                    src={`data:image/png;base64,${userpic?.data}`}
                    alt="User avatar"
                />
                <div className="hidden md:block w-full truncate">
                    {firstName} {lastName}
                </div>
            </Link>
        </motion.div>
    );
}
