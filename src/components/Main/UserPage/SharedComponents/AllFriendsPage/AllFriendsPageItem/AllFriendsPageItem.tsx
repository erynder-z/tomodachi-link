import { FriendDataType } from '../../../../../../types/friendTypes';
import { useNavigate } from 'react-router-dom';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import { TbUserSearch } from 'react-icons/tb';
import { motion } from 'framer-motion';

type AllFiendsPageItemProps = {
    friendData: FriendDataType;
};

/**
 * React component for rendering an item in the All Friends page.
 *
 * @component
 * @param {AllFiendsPageItemProps} props - The component props.
 * @param {FriendDataType} props.friendData - Data of the friend to be displayed.
 * @returns {JSX.Element} The rendered AllFiendsPageItem component.
 */
export default function AllFiendsPageItem({
    friendData,
}: AllFiendsPageItemProps): JSX.Element {
    const navigate = useNavigate();
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = friendData ?? {};

    /**
     * Handles user click and navigates to the user's page.
     *
     * @function
     * @returns {void}
     */
    const handleUserClick = (): void => {
        if (!currentUserData) return;

        const path = currentUserData?._id === _id ? '/mypage' : `/users/${_id}`;
        navigate(path);
    };

    /**
     * JSX Element representing the All Friends page item.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col">
            <motion.div
                onClick={handleUserClick}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer relative rounded outline-highlight dark:outline-highlightDark hover:outline hover:outline-8"
            >
                <img
                    className="w-40 h-auto aspect-square object-cover shadow-lg rounded"
                    src={`data:image/png;base64,${userpic.data}`}
                    alt="User avatar"
                />
                <div className="absolute inset-0 flex justify-center items-center aspect-square bg-black bg-opacity-75 opacity-0 hover:opacity-75 transition-opacity cursor-pointer rounded">
                    <span className="text-white text-lg font-bold">
                        <TbUserSearch size="2.5em" />
                    </span>
                </div>
            </motion.div>
            <div className="text-center text-xs font-bold p-1 break-all">
                {firstName} {lastName}
            </div>
        </div>
    );
}
