import React, { useEffect, useState } from 'react';
import UserListItem from './UserListItem/UserListItem';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { fetchSomeUsers } from '../../../utilities/fetchSomeUsers';
import { MinimalUserTypes } from '../../../types/minimalUserTypes';

export default function UserList() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUsers = async () => {
        if (authUser && token) {
            const response = await fetchSomeUsers(token, setInfo);
            setUsers(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    const userList = users?.map((user: MinimalUserTypes) => (
        <UserListItem key={user._id} listItemData={user} />
    ));
    return (
        <div className="flex flex-col w-full p-4 bg-canvas">
            <h1 className="text-center font-bold">People you may know:</h1>
            {userList}
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
