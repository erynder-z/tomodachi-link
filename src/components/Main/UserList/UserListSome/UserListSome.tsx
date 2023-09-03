import React, { useEffect, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { fetchSomeUsers } from '../../../../utilities/fetchSomeUsers';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { motion } from 'framer-motion';

export default function UserListSome() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchUsers = useRef(true);

    const handleFetchUsers = async () => {
        if (authUser && token) {
            const response = await fetchSomeUsers(token, setInfo);
            setUsers(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldFetchUsers.current === true) {
            handleFetchUsers();
        }
        return () => {
            shouldFetchUsers.current = false;
        };
    }, []);

    const userList = users?.map((user: MinimalUserTypes) => (
        <UserListItem key={user._id} listItemData={user} />
    ));
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ once: true }}
            className="flex flex-col w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-center font-bold">People you may know:</h1>
            {userList}
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
        </motion.div>
    );
}
