import { useEffect, useRef, useState } from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserTypes';
import FriendList from '../../SharedComponents/FriendList/FriendList';
import { formatDistanceToNow } from 'date-fns';
import FriendCoverSection from './FriendCoverSection/FriendCoverSection';
import PictureList from '../../SharedComponents/PictureList/PictureList';
import PostList from '../../SharedComponents/PostList/PostList';
import { FinalColor } from 'extract-colors';
import tinycolor from 'tinycolor2';
import { motion, useInView } from 'framer-motion';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import AboutMeSection from '../../SharedComponents/AboutMeSection/AboutMeSection';

type FriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isPaginationTriggered: boolean;
};

/**
 * React component for displaying the user page of a friend.
 *
 * @component
 * @param {FriendUserPageProps} props - The component props.
 * @param {OtherUserPageDataTypes} props.userPageData - Data of the user page.
 * @param {boolean} props.isPaginationTriggered - Flag for pagination trigger.
 * @returns {JSX.Element} The rendered FriendUserPage component.
 */
export default function FriendUserPage({
    userPageData,
    isPaginationTriggered,
}: FriendUserPageProps): JSX.Element {
    const {
        _id,
        firstName,
        lastName,
        about,
        userpic,
        cover,
        friends,
        mutualFriends,
        lastSeen,
    } = userPageData || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [componentLoading, setComponentLoading] = useState({
        coverSection: true,
        pictureList: true,
    });
    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#e4e6ea'
        : '#020202';

    const FriendPageContentRef = useRef(null);
    const isInView = useInView(FriendPageContentRef, { once: true });

    const userPicture = userpic.data;
    const numberOfFriends = friends.length;
    const lastSeenFormatted = lastSeen
        ? `${formatDistanceToNow(new Date(lastSeen), { addSuffix: true })} `
        : '';

    /**
     * Callback function to handle the completion of fetching data in sub-components.
     *
     * @param {string} nameOfComponent - Name of the completed component.
     */
    const onFetchComplete = (nameOfComponent: string) => {
        setComponentLoading((prevLoading) => ({
            ...prevLoading,
            [nameOfComponent]: false,
        }));
    };

    /**
     * UseEffect to check if all sub-components have finished loading.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (Object.values(componentLoading).every((v) => v === false))
            setLoading(false);
    }, [componentLoading]);

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div
            className={`${
                loading ? 'flex' : 'hidden'
            } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-background2 dark:bg-background2Dark `}
        >
            <LoadingSpinner message={`Setting up ${firstName}'s page`} />
        </div>
    );

    /**
     * JSX Element representing the user page content.
     *
     * @type {JSX.Element}
     */
    const UserPageContent: JSX.Element = (
        <motion.div
            ref={FriendPageContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading
                    ? 'hidden'
                    : 'flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark'
            }`}
        >
            <div className="flex flex-col h-full gap-8">
                <FriendCoverSection
                    _id={_id}
                    firstName={firstName}
                    lastName={lastName}
                    userPicture={userPicture}
                    cover={cover}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    setColorPalette={setColorPalette}
                    numberOfFriends={numberOfFriends}
                    lastSeenFormatted={lastSeenFormatted}
                    mutualFriends={mutualFriends}
                    onFetchComplete={onFetchComplete}
                />
                <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8">
                    <div className="flex flex-col h-1/4 md:h-auto w-full md:p-4 gap-8 md:mr-auto">
                        <AboutMeSection
                            aboutName={firstName}
                            aboutText={about}
                        />
                        <PictureList
                            onFetchComplete={onFetchComplete}
                            userId={userPageData._id}
                        />

                        <FriendList friendData={friends} userId={_id} />
                    </div>

                    <div className="flex flex-col gap-8 md:px-4 overflow-auto">
                        <PostList
                            userId={_id}
                            key={_id}
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    /**
     * The rendered FriendUserPage component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            {LoadingContent}
            {UserPageContent}
        </>
    );
}
