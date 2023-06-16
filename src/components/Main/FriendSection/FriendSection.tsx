import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import useFriendData from '../../../hooks/useFriendData';
import { MinimalUserTypes } from '../../../types/minimalUserTypes';
import FriendCard from './FriendCard/FriendCard';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { fetchSomeFriendsOfFriends } from '../../../utilities/fetchSomeFriendsOfFriends';
import SuggestionCard from './SuggestionCard/SuggestionCard';

type FriendSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function FriendSection({ setCurrentView }: FriendSectionProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const { friendData } = useFriendData();
    const [friendsOfFriends, setFriendsOfFriends] = useState<
        MinimalUserTypes[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUsers = async () => {
        if (authUser && token) {
            const response = await fetchSomeFriendsOfFriends(token, setInfo);
            setFriendsOfFriends(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (friendData) {
            setLoading(false);
        }
    }, [friendData]);

    useEffect(() => {
        handleFetchUsers();
        setCurrentView('Friends');
        localStorage.setItem('currentView', 'Friends');
    }, []);

    const friendProfileCardList = friendData?.map(
        (friendObject: MinimalUserTypes) => (
            <FriendCard key={friendObject._id} friendData={friendObject} />
        )
    );

    const friendsOfFriendsCardList = friendsOfFriends?.map(
        (friendObject: MinimalUserTypes) => (
            <SuggestionCard key={friendObject._id} friendData={friendObject} />
        )
    );

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card ">
                <h1 className="font-bold">Getting friend data...</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-card shadow-lg">
            <h1 className="text-center text-xl font-bold">Friends</h1>
            <div className="animate-popInAnimation grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4">
                {friendProfileCardList}
            </div>
            <h1 className="text-center text-xl font-bold">
                Maybe you know these people?
            </h1>
            <div className="animate-popInAnimation grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4">
                {friendsOfFriendsCardList}
            </div>
        </div>
    );
}
