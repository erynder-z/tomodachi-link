import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import useFriendData from '../../../hooks/useFriendData';
import { MinimalUserTypes } from '../../../types/minimalUserTypes';
import FriendCard from './FriendCard/FriendCard';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { fetchSomeFriendsOfFriends } from '../../../utilities/fetchSomeFriendsOfFriends';
import { FriendsOfFriendsType } from '../../../types/friendsOfFriendsType';
import { fetchSomeUsers } from '../../../utilities/fetchSomeUsers';
import SuggestionCardRandom from './SuggestionCardRandom/SuggestionCardRandom';
import SuggestionCardFriend from './SuggestionCardFriend/SuggestionCardFriend';

type FriendSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function FriendSection({ setCurrentView }: FriendSectionProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const { friendData } = useFriendData();
    const [friendsOfFriends, setFriendsOfFriends] = useState<
        FriendsOfFriendsType[]
    >([]);
    const [randomUsers, setRandomUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetch = useRef(true);

    const handleFetchFriendsOfFriends = async () => {
        if (authUser && token) {
            const response = await fetchSomeFriendsOfFriends(token, setInfo);
            setFriendsOfFriends(response);
            setLoading(false);
        }
    };

    const handleFetchRandomUsers = async () => {
        if (authUser && token) {
            const response = await fetchSomeUsers(token, setInfo);
            setRandomUsers(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (friendData) {
            setLoading(false);
        }
    }, [friendData]);

    useEffect(() => {
        handleFetchFriendsOfFriends();
        setCurrentView('Friends');
        localStorage.setItem('currentViewOdinBook', 'Friends');
    }, []);

    useEffect(() => {
        if (shouldFetch.current === true) {
            if (friendsOfFriends.length === 0) {
                handleFetchRandomUsers();
            }
        }
        return () => {
            shouldFetch.current = false;
        };
    }, [friendsOfFriends]);

    const friendProfileCardList = friendData?.map(
        (friendObject: MinimalUserTypes) => (
            <FriendCard key={friendObject._id} friendData={friendObject} />
        )
    );

    const getSuggestionList = () => {
        if (!friendsOfFriends || friendsOfFriends.length === 0) {
            const randomUsersCardList = randomUsers?.map(
                (userObject: MinimalUserTypes) => (
                    <SuggestionCardRandom
                        key={userObject._id}
                        userData={userObject}
                    />
                )
            );
            return randomUsersCardList;
        }

        const friendsOfFriendsCardList = friendsOfFriends?.map(
            (friendObject: FriendsOfFriendsType) => (
                <SuggestionCardFriend
                    key={friendObject._id}
                    friendData={friendObject}
                />
            )
        );

        return friendsOfFriendsCardList;
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card dark:bg-cardDark">
                <h1 className="font-bold">Getting friend data...</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 min-h-[calc(100vh_-_5rem)] w-full lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded md:rounded-lg">
            <h1 className="text-center text-xl font-bold">Friends</h1>
            <div className="animate-popInAnimation flex flex-col items-center md:flex-row flex-wrap gap-4 w-full p-4">
                {friendProfileCardList}
                {friendProfileCardList?.length === 0 && (
                    <span className="text-center">
                        You have not added any friends yet!
                    </span>
                )}
            </div>
            <h1 className="text-center text-xl font-bold">
                Maybe you know these people?
            </h1>
            <div className="animate-popInAnimation flex flex-col items-center md:flex-row flex-wrap gap-4 w-full p-4">
                {getSuggestionList()}
            </div>
        </div>
    );
}
