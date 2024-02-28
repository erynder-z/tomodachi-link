import { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import NewPostInput from '../../Post/NewPostInput/NewPostInput';
import useFriendData from '../../../../hooks/useFriendData';
import FriendList from '../SharedComponents/FriendList/FriendList';
import FriendRequests from './FriendRequests/FriendRequests';
import MyCoverSection from './MyCoverSection/MyCoverSection';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import PictureList from '../SharedComponents/PictureList/PictureList';
import PostList from '../SharedComponents/PostList/PostList';
import tinycolor from 'tinycolor2';
import { FinalColor } from 'extract-colors';
import { motion, useInView } from 'framer-motion';
import AboutMeSection from '../SharedComponents/AboutMeSection/AboutMeSection';

type MyPageProps = {
    isPaginationTriggered: boolean;
};

const TEXT_DARK_COLOR = '#020202';
const TEXT_LIGHT_COLOR = '#e4e6ea';

/**
 * React component for rendering the user's page.
 *
 * @component
 * @param {MyPageProps} props - The component props.
 * @param {boolean} props.isPaginationTriggered - Indicates whether pagination is triggered.
 * @returns {JSX.Element} The rendered MyPage component.
 */
export default function MyPage({
    isPaginationTriggered,
}: MyPageProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { friendData } = useFriendData();
    const { pendingFriendRequests } = currentUserData || {};
    const [myPostsKey, setMyPostsKey] = useState(0);
    const [myPicsKey, setMyPicsKey] = useState(0);
    const [shouldRefreshPictureList, setShouldRefreshPictureList] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [componentLoading, setComponentLoading] = useState({
        coverSection: true,
        friendRequests: true,
        pictureList: true,
    });
    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? TEXT_LIGHT_COLOR
        : TEXT_DARK_COLOR;

    const MyPageContentRef = useRef(null);
    const isInView = useInView(MyPageContentRef, { once: true });

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;
    const userId = currentUserData?._id;
    const aboutText = currentUserData?.about;

    /**
     * Handles refreshing posts by updating the state variable to force remount.
     *
     * @function
     * @returns {void}
     */
    const handleRefreshPosts = (): void =>
        setMyPostsKey((prevKey) => prevKey + 1); // update state variable to force remount

    /**
     * Handles refreshing pictures by updating the state variable to force remount.
     *
     * @function
     * @returns {void}
     */
    const handleRefreshPics = (): void =>
        setMyPicsKey((prevKey) => prevKey + 1); // update state variable to force remount

    /**
     * Callback function to handle fetch completion of components.
     *
     * @function
     * @param {string} nameOfComponent - The name of the completed component.
     * @returns {void}
     */
    const onFetchComplete = (nameOfComponent: string): void => {
        setComponentLoading((prevLoading) => ({
            ...prevLoading,
            [nameOfComponent]: false,
        }));
    };

    /**
     * useEffect hook to check if the picture list should be refreshed.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (shouldRefreshPictureList === true) handleRefreshPics();

        return () => {
            setShouldRefreshPictureList(false);
        };
    }, [shouldRefreshPictureList]);

    /**
     * useEffect hook to check if all components are loaded and set the loading status.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (Object.values(componentLoading).every((v) => v === false))
            setLoading(false);
    }, [componentLoading]);

    /**
     * useEffect hook to check if there are pending friend requests and set the loading status.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (
            numberOfPendingFriendRequests !== undefined &&
            numberOfPendingFriendRequests === 0
        ) {
            setComponentLoading((prevLoading) => ({
                ...prevLoading,
                friendRequests: false,
            }));
        }
    }, [numberOfPendingFriendRequests]);

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-background2 dark:bg-background2Dark ">
            <LoadingSpinner message="Setting up your page" />
        </div>
    );

    /**
     * JSX Element representing the content of the user's page.
     *
     * @type {JSX.Element}
     */
    const MyPageContent: JSX.Element = (
        <motion.div
            ref={MyPageContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading ? 'hidden' : 'md:grid'
            } flex flex-col grid-cols-[1fr,2fr] h-full gap-8`}
        >
            <MyCoverSection
                onFetchComplete={onFetchComplete}
                backgroundColor={backgroundColor}
                textColor={textColor}
                setColorPalette={setColorPalette}
            />
            <div className="flex flex-col lg:h-1/2">
                {numberOfPendingFriendRequests ? (
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <FriendRequests
                            onFetchComplete={onFetchComplete}
                            pendingFriendRequests={pendingFriendRequests}
                        />
                    </div>
                ) : null}
                <div className="flex flex-col h-1/4 md:h-auto w-full md:p-4 gap-8 md:mr-auto">
                    <AboutMeSection aboutText={aboutText} />
                    <PictureList
                        key={myPicsKey}
                        onFetchComplete={onFetchComplete}
                        userId={userId}
                    />

                    <FriendList friendData={friendData} userId={userId} />
                </div>
            </div>
            <div className="flex flex-col gap-8 md:px-4">
                <NewPostInput
                    handleRefreshPosts={handleRefreshPosts}
                    handleRefreshPics={handleRefreshPics}
                />

                <PostList
                    key={myPostsKey}
                    userId={userId}
                    isPaginationTriggered={isPaginationTriggered}
                    onPostChange={handleRefreshPosts}
                    setShouldRefreshPictureList={setShouldRefreshPictureList}
                />
            </div>
        </motion.div>
    );

    /**
     * JSX Element representing the entire MyPage component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col min-h-[calc(100vh_-_3rem)] lg:min-h-full  bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg">
            {loading && LoadingContent}
            {MyPageContent}
        </div>
    );
}
