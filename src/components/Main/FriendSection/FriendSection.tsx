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
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';
import { motion, useInView } from 'framer-motion';
import { backendFetch } from '../../../utilities/backendFetch';
import { FetchStatusType } from '../../../types/miscTypes';

const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

/**
 * FriendSection component to display the user's friends and friend suggestions.
 *
 * @component
 * @return {JSX.Element} The rendered FriendSection component.
 */

export default function FriendSection(): JSX.Element {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const { friendData } = useFriendData();
    const { setActiveChat } = useNotificationBubblesContext();
    const [friendsOfFriends, setFriendsOfFriends] = useState<
        FriendsOfFriendsType[]
    >([]);
    const [randomUsers, setRandomUsers] = useState<MinimalUserTypes[]>([]);
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchFriendsOfFriends = useRef(true);
    const FriendSectionContentRef = useRef(null);
    const isInView = useInView(FriendSectionContentRef, { once: true });

    /**
     * Function to handle fetching friends of friends.
     *
     * @async
     * @function
     * @return {Promise<void>} A Promise that resolves when fetching is complete.
     */
    const handleFetchFriendsOfFriends = async (): Promise<void> => {
        const currentFriendsOfFriends = friendsOfFriends;
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/users/maybefriends';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            setFetchStatus('fetching');

            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL,
                    METHOD,
                    ERROR_MESSAGE
                );
                setFriendsOfFriends(response?.friendsOfFriends);
                setLoading(response.length <= 0);
                if (response.friendsOfFriends?.length <= 0)
                    handleFetchRandomUsers();
            } catch (error) {
                setFriendsOfFriends(currentFriendsOfFriends);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
            }
        }
    };

    /**
     * Function to handle fetching random users.
     *
     * @async
     * @function
     * @return {Promise<void>} A Promise that resolves when fetching is complete.
     */
    const handleFetchRandomUsers = async (): Promise<void> => {
        const currentUserList = randomUsers;
        if (authUser && token) {
            const API_ENDPOINT_URL = `/api/v1/users/some`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            setFetchStatus('fetching');

            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL,
                    METHOD,
                    ERROR_MESSAGE
                );
                setRandomUsers(response?.userList);
            } catch (error) {
                setRandomUsers(currentUserList);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
            }
        }
    };

    /**
     * Function to generate the suggestion list.
     *
     * @function
     * @return {JSX.Element[]} An array of suggestion list elements.
     */
    const getSuggestionList = (): JSX.Element[] => {
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

    /**
     * Effect to handle fetching friends of friends.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldFetchFriendsOfFriends.current) handleFetchFriendsOfFriends();

        return () => {
            shouldFetchFriendsOfFriends.current = false;
        };
    }, [friendData]);

    /**
     * List of friend cards.
     *
     * @type {JSX.Element[]}
     */
    const friendProfileCardList: JSX.Element[] =
        friendData?.map((friendObject: MinimalUserTypes) => (
            <FriendCard
                key={friendObject._id}
                friendData={friendObject}
                setActiveChat={setActiveChat}
            />
        )) || [];

    /**
     * Aggregated suggestion list.
     *
     * @type {JSX.Element[]}
     */
    const SuggestionList: JSX.Element[] = getSuggestionList();

    /**
     * Content to display when loading.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div
            className={`${
                loading ? 'flex' : 'hidden'
            } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-background2 dark:bg-background2Dark `}
        >
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : fetchStatus === 'error'
                        ? 'It should not take this long...Try refreshing the page!'
                        : 'Getting friend data'
                }
            />
        </div>
    );

    /**
     * Content to display when friend list is should be shown.
     *
     * @type {JSX.Element}
     */
    const FriendListContent: JSX.Element = (
        <>
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

    /**
     * Content to display when suggestion list should me shown.
     *
     * @type {JSX.Element}
     */
    const SuggestionListContent: JSX.Element = (
        <>
            <h1 className="text-center text-xl font-bold">
                Maybe you know these people?
            </h1>
            <div className="flex flex-col items-center md:flex-row flex-wrap gap-4 w-full p-4">
                {SuggestionList}
            </div>
        </>
    );

    /**
     * Header component.
     *
     * @type {JSX.Element}
     */
    const Header: JSX.Element = (
        <h1 className="flex justify-center gap-2 text-xl font-bold sticky z-50 top-0 md:top-4 md:mb-4 py-1 px-4 w-full md:w-fit md:rounded-full bg-background2 dark:bg-background2Dark md:bg-gray-300/80 md:dark:bg-gray-500/80">
            Friends
        </h1>
    );

    /**
     * Main content of the FriendSection component.
     *
     * @type {JSX.Element}
     */
    const FriendSectionContent: JSX.Element = (
        <motion.div
            ref={FriendSectionContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading
                    ? 'hidden'
                    : 'flex flex-col items-center gap-4 min-h-[calc(100vh_-_3rem)] w-full lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded md:rounded-lg'
            }`}
        >
            {Header}
            {FriendListContent}
            {SuggestionList.length > 0 && SuggestionListContent}
        </motion.div>
    );

    /**
     * Rendered FriendSection component.
     *
     * @type {JSX.Element[]}
     */
    return (
        <>
            {LoadingContent}
            {FriendSectionContent}
        </>
    );
}
