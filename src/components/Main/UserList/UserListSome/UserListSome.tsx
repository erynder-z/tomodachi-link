import { useEffect, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';

export default function UserListSome() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchUsers = useRef(true);

    const handleFetchUsers = async () => {
        if (authUser && token) {
            const apiEndpointURL = `/api/v1/users/some`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch users!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );
            setUsers(response?.userList);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldFetchUsers.current) handleFetchUsers();

        return () => {
            shouldFetchUsers.current = false;
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
            className="flex flex-col w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-center font-bold">People you may know:</h1>
            {userList}
        </motion.div>
    );

    return loading ? LoadingContent : UserListContent;
}
