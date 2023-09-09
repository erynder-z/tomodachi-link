import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
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
import { motion } from 'framer-motion';

type MyPageProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function MyPage({
    setCurrentView,
    isPaginationTriggered,
}: MyPageProps) {
    const { currentUserData } = useCurrentUserData();
    const { friendData } = useFriendData();
    const { pendingFriendRequests } = currentUserData || {};
    const [myPostsKey, setMyPostsKey] = useState(0);
    const [myPicsKey, setMyPicsKey] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [componentLoading, setComponentLoading] = useState({
        coverSection: true,
        friendRequests: true,
        pictureList: true,
    });
    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#e4e6ea'
        : '#020202';

    const shouldSetCurrentView = useRef(true);

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;
    const userId = currentUserData?._id;

    const handleRefreshPosts = () => {
        setMyPostsKey((prevKey) => prevKey + 1); // update state variable to force remount
    };

    const handleRefreshPics = () => {
        setMyPicsKey((prevKey) => prevKey + 1); // update state variable to force remount
    };

    const onFetchComplete = (nameOfComponent: string) => {
        setComponentLoading((prevLoading) => ({
            ...prevLoading,
            [nameOfComponent]: false,
        }));
    };

    useEffect(() => {
        if (shouldSetCurrentView.current) {
            setCurrentView('MyPage');
            localStorage.setItem('currentViewOdinBook', 'MyPage');
        }
        return () => {
            shouldSetCurrentView.current = false;
        };
    }, []);

    useEffect(() => {
        if (Object.values(componentLoading).every((v) => v === false)) {
            setLoading(false);
        }
    }, [componentLoading]);

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

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_3rem)] lg:min-h-full  bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg">
            <div
                className={`${
                    loading ? 'flex' : 'hidden'
                } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-card dark:bg-cardDark `}
            >
                <LoadingSpinner />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
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
                    />
                </div>
            </motion.div>
        </div>
    );
}
