import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import defaultUserpic from '../../../../assets/defaultUserpic.png';

type UserListItemProps = {
    listItemData: MinimalUserTypes;
};

/**
 * React component representing a single user item in the list.
 *
 * @component
 * @param {UserListItemProps} props - The component props.
 * @param {MinimalUserTypes} props.listItemData - Data of the user item.
 * @returns {JSX.Element} The rendered UserListItem component.
 */
export default function UserListItem({ listItemData }: UserListItemProps) {
    const { _id, firstName, lastName, userpic } = listItemData || {};

    // Use the default userpic if no userpic is provided. (This should only apply to fake users created with faker.js)
    const userpicSrc = userpic?.data
        ? `data:image/png;base64,${userpic.data}`
        : defaultUserpic;

    /**
     * Renders a clickable button with a link to the user's profile.
     *
     * @returns {JSX.Element} The rendered button/link.
     */
    return (
        <motion.button whileTap={{ scale: 0.97 }} className="flex-1 max-h-12">
            <Link
                to={`/users/${_id}`}
                className="flex items-center h-full w-full gap-2 text-sm text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg"
            >
                <img
                    loading="lazy"
                    className="w-6 md:w-8 h-auto object-cover rounded-full"
                    src={userpicSrc}
                    alt="User avatar"
                />
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {firstName} {lastName}
                </div>
            </Link>
        </motion.button>
    );
}
