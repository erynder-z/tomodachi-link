import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { SearchResultUserType } from '../../../../types/searchTypes';

type SearchResultsUserListItem = {
    itemData: SearchResultUserType;
};

export default function SearchResultsUserListItem({
    itemData,
}: SearchResultsUserListItem) {
    const { _id, firstName, lastName, userpic } = itemData || {};

    return (
        <Link
            to={`/users/${_id}`}
            className="flex justify-between w-full py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 rounded lg:rounded-lg text-sm md:text-base"
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
            <div>User</div>
        </Link>
    );
}
