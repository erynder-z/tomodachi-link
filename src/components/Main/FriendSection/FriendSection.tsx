import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import useFriendData from '../../../hooks/useFriendData';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import FriendCard from './FriendCard/FriendCard';
import SuggestionCardRandom from './SuggestionCardRandom/SuggestionCardRandom';
import SuggestionCardFriend from './SuggestionCardFriend/SuggestionCardFriend';
import { FriendsOfFriendsType } from '../../../types/friendTypes';
import { MinimalUserTypes } from '../../../types/otherUserTypes';
import { fetchSomeFriendsOfFriends } from '../../../utilities/fetchSomeFriendsOfFriends';
import { fetchSomeUsers } from '../../../utilities/fetchSomeUsers';
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';
import { motion, useInView } from 'framer-motion';

export default function FriendSection() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const { friendData } = useFriendData();
    const { setActiveChat } = useNotificationBubblesContext();
    const [friendsOfFriends, setFriendsOfFriends] = useState<
        FriendsOfFriendsType[]
    >([]);
    const [randomUsers, setRandomUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchFriendsOfFriends = useRef(true);
    const FriendSectionContentRef = useRef(null);
    const isInView = useInView(FriendSectionContentRef, { once: true });

    useEffect(() => {
        if (shouldFetchFriendsOfFriends.current) handleFetchFriendsOfFriends();

        return () => {
            shouldFetchFriendsOfFriends.current = false;
        };
    }, [friendData]);

    const handleFetchFriendsOfFriends = async () => {
        if (authUser && token) {
            const response = await fetchSomeFriendsOfFriends(token, setInfo);
            setFriendsOfFriends(response);
            setLoading(response.length <= 0);
            if (response.length <= 0) handleFetchRandomUsers();
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

    const SuggestionList = getSuggestionList();

    const LoadingContent = (
        <div
            className={`${
                loading ? 'flex' : 'hidden'
            } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-background2 dark:bg-background2Dark `}
        >
            <LoadingSpinner message="Getting friend data" />
        </div>
    );

    const FriendListContent = (
        <>
            <h1 className="text-center text-xl font-bold">Friends</h1>
            <div className="flex flex-col items-center md:flex-row flex-wrap gap-4 w-full p-4">
                {friendProfileCardList}
                {friendProfileCardList?.length === 0 && (
                    <span className="text-center">
                        You have not added any friends yet!
                    </span>
                )}
            </div>
        </>
    );

    const SuggestionListContent = (
        <>
            <h1 className="text-center text-xl font-bold">
                Maybe you know these people?
            </h1>
            <div className="flex flex-col items-center md:flex-row flex-wrap gap-4 w-full p-4">
                {SuggestionList}
            </div>
        </>
    );

    const FriendSectionContent = (
        <motion.div
            ref={FriendSectionContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading
                    ? 'hidden'
                    : 'flex flex-col gap-4 min-h-[calc(100vh_-_3rem)] w-full lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded md:rounded-lg'
            }`}
        >
            {FriendListContent}
            {SuggestionListContent}
        </motion.div>
    );

    return (
        <>
            {LoadingContent}
            {FriendSectionContent}
        </>
    );
}
