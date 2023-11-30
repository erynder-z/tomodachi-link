import { useEffect, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';

export default function UserListAll() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);
    const [users, setUsers] = useState<MinimalUserTypes[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    const handleFetchAllUsers = async () => {
        if (authUser && token) {
            const apiEndpointURL = `/api/v1/users/all?skip=${skip}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';
            const fetchedUsers = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                METHOD,
                ERROR_MESSAGE
            );
            setUsers([...users, ...fetchedUsers.userList]);
            setLoading(false);
        }
    };

    const handleFetchNumberOfUsers = async () => {
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/users/count';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            const fetchedNumberOfUsers = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setNumberOfUsers(fetchedNumberOfUsers?.numberOfUsers);
        }
    };

    const handleButtonClick = () => {
        if (users) setSkip(users.length);
    };

    useEffect(() => {
        if (skip) handleFetchAllUsers();
    }, [skip]);

    useEffect(() => {
        if (shouldInitialize.current) {
            handleFetchNumberOfUsers();
            handleFetchAllUsers();
        }
        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const userList = users?.map((user: MinimalUserTypes) => (
        <UserListItem key={user._id} listItemData={user} />
    ));

    const LoadingContent = (
        <div className="flex justify-center items-center w-full h-[calc(100vh_-_3rem)] py-4 ">
            <LoadingSpinner />
        </div>
    );

    const UserListContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col w-full h-full  p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-center font-bold mb-4">All users:</h1>
            <div className="flex flex-col h-full w-full gap-2 md:gap-3 overflow-y-auto">
                {userList}
            </div>
            {numberOfUsers != null && users.length < numberOfUsers - 1 && (
                <motion.button
                    onClick={handleButtonClick}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit  bg-blue-500 hover:bg-blue-600 text-regularTextDark px-2 py-1 mt-4 text-sm"
                >
                    Get more
                </motion.button>
            )}
        </motion.div>
    );

    return loading ? LoadingContent : UserListContent;
}
