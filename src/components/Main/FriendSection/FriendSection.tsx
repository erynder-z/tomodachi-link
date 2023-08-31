import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import useFriendData from '../../../hooks/useFriendData';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import FriendCard from './FriendCard/FriendCard';
import SuggestionCardRandom from './SuggestionCardRandom/SuggestionCardRandom';
import SuggestionCardFriend from './SuggestionCardFriend/SuggestionCardFriend';
import { ChatConversationType } from '../../../types/chatConversationType';
import { FriendsOfFriendsType } from '../../../types/friendsOfFriendsType';
import { MinimalUserTypes } from '../../../types/minimalUserTypes';
import { fetchSomeFriendsOfFriends } from '../../../utilities/fetchSomeFriendsOfFriends';
import { fetchSomeUsers } from '../../../utilities/fetchSomeUsers';
import { CurrentViewType } from '../../../types/currentViewType';

type FriendSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
};

export default function FriendSection({
    setCurrentView,
    setActiveChat,
}: FriendSectionProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const { friendData } = useFriendData();
    const [friendsOfFriends, setFriendsOfFriends] = useState<
        FriendsOfFriendsType[]
    >([]);
    const [randomUsers, setRandomUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchFriendsOfFriends = useRef(true);

    useEffect(() => {
        if (shouldFetchFriendsOfFriends.current) {
            handleFetchFriendsOfFriends();
        }
        return () => {
            shouldFetchFriendsOfFriends.current = false;
        };
    }, [friendData]);

    useEffect(() => {
        setCurrentView('Friends');
        localStorage.setItem('currentViewOdinBook', 'Friends');
    }, []);

    const handleFetchFriendsOfFriends = async () => {
        if (authUser && token) {
            const response = await fetchSomeFriendsOfFriends(token, setInfo);
            setFriendsOfFriends(response);
            setLoading(response.length <= 0);
            if (response.length <= 0) {
                handleFetchRandomUsers();
            }
        }
    };

    const handleFetchRandomUsers = async () => {
        if (authUser && token) {
            const response = await fetchSomeUsers(token, setInfo);
            setRandomUsers(response);
            setLoading(false);
        }
    };

    const getSuggestionList = () => {
        const suggestionList =
            friendsOfFriends.length === 0 ? randomUsers : friendsOfFriends;

        return suggestionList.map(
            (suggestion: MinimalUserTypes | FriendsOfFriendsType) =>
                suggestionList === randomUsers ? (
                    <SuggestionCardRandom
                        key={suggestion._id}
                        userData={suggestion as MinimalUserTypes}
                    />
                ) : (
                    <SuggestionCardFriend
                        key={suggestion._id}
                        friendData={suggestion as FriendsOfFriendsType}
                    />
                )
        );
    };

    const friendProfileCardList = friendData?.map(
        (friendObject: MinimalUserTypes) => (
            <FriendCard
                key={friendObject._id}
                friendData={friendObject}
                setActiveChat={setActiveChat}
            />
        )
    );

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
                {loading && <LoadingSpinner />}
            </div>
        </div>
    );
}
