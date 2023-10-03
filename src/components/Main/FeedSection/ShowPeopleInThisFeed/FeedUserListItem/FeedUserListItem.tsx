import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';

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
        <Link
            to={path}
            className="flex items-center w-full gap-4 py-2 text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="hidden md:block overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </Link>
    );
}
