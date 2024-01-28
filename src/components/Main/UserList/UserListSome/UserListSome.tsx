import { useEffect, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';

/**
 * React component representing a list of suggested users.
 *
 * @component
 * @returns {JSX.Element} The rendered UserListSome component.
 */
export default function UserListSome(): JSX.Element {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchUsers = useRef(true);

    /**
     * Fetches a list of suggested users from the backend.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const handleFetchUsers = async (): Promise<void> => {
        if (authUser && token) {
            setLoading(true);
            const API_ENDPOINT_URL = `/api/v1/users/some`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setUsers(response?.userList);
            setLoading(false);
        }
    };

    // Effect to fetch users on component mount
    /**
     * useEffect hook to fetch users on component mount.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (shouldFetchUsers.current) handleFetchUsers();

        return () => {
            shouldFetchUsers.current = false;
        };
    }, []);

    /**
     * Maps the user data to UserListItem components.
     *
     * @type {Array<JSX.Element>|null}
     */
    const userList: Array<JSX.Element> | null = users?.map(
        (user: MinimalUserTypes) => (
            <UserListItem key={user._id} listItemData={user} />
        )
    );

    // Loading and content components
    /**
     * Loading spinner component.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex justify-center items-center w-full h-full py-4 ">
            <LoadingSpinner />
        </div>
    );

    /**
     * Main content component with user list and "Get new suggestions" button.
     *
     * @type {JSX.Element}
     */
    const UserListContent: JSX.Element = (
        <motion.div
            key="userList"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh_-_5rem)] md:h-full w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-lg m-0 text-center font-bold mb-4">
                People you may know:
            </h1>
            <div className="overflow-auto flex flex-col flex-1">{userList}</div>
            <button
                onClick={handleFetchUsers}
                className="flex items-center justify-center w-full p-2 mt-4 bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded text-sm text-center transition-all"
            >
                Get new suggestions
            </button>
        </motion.div>
    );

    /**
     * The user list capable of displaying some users.
     *
     * @returns {JSX.Element}
     */
    return (
        <AnimatePresence mode="wait">
            {loading ? LoadingContent : UserListContent}
        </AnimatePresence>
    );
}
