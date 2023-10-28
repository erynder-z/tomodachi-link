import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { motion } from 'framer-motion';

type UserListItemProps = {
    listItemData: MinimalUserTypes;
};

export default function UserListItem({ listItemData }: UserListItemProps) {
    const { _id, firstName, lastName, userpic } = listItemData || {};

    return (
        <motion.button whileTap={{ scale: 0.97 }}>
            <Link
                to={`/users/${_id}`}
                className="flex items-center w-full gap-4 py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg"
            >
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
            </Link>
        </motion.button>
    );
}
