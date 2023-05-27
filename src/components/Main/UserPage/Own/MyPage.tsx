import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import NewPostInput from '../../NewPostInput/NewPostInput';
import useFriendData from '../../../../hooks/useFriendData';
import FriendList from '../SharedComponents/FriendList/FriendList';
import FriendRequests from './FriendRequests/FriendRequests';
import MyCoverSection from './MyCoverSection/MyCoverSection';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import PictureList from '../SharedComponents/PictureList/PictureList';
import PostList from '../SharedComponents/PostList/PostList';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [componentLoading, setComponentLoading] = useState({
        currentUserData: true,
        coverSection: true,
    });

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;
    const userId = currentUserData?._id;

    const handleRefreshPosts = () => {
        setMyPostsKey((prevKey) => prevKey + 1); // update state variable to force remount
    };

    const onFetchComplete = (nameOfComponent: string) => {
        setComponentLoading({ ...componentLoading, [nameOfComponent]: false });
    };

    useEffect(() => {
        setCurrentView('MyPage');
        localStorage.setItem('currentView', 'MyPage');
    }, []);

    useEffect(() => {
        setComponentLoading({ ...componentLoading, currentUserData: false });
    }, [currentUserData]);

    useEffect(() => {
        if (Object.values(componentLoading).every((v) => v === false)) {
            setLoading(false);
        }
    }, [componentLoading]);

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] p-4 md:p-0 pb-4  bg-card shadow-lg">
            <div
                className={`${
                    loading ? 'flex' : 'hidden'
                } flex-col justify-center items-center w-full h-[calc(100vh_-_7rem)] py-4 bg-card `}
            >
                <h1 className="font-bold">getting user data!</h1>
                <LoadingSpinner />
            </div>
            <div
                className={`${
                    loading ? 'hidden' : 'md:grid'
                } flex flex-col grid-cols-[1fr,2fr] h-full gap-8`}
            >
                <MyCoverSection onFetchComplete={onFetchComplete} />
                <div className="flex flex-col lg:h-1/2">
                    {numberOfPendingFriendRequests ? (
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendRequests
                                pendingFriendRequests={pendingFriendRequests}
                            />
                        </div>
                    ) : null}
                    <div className="flex flex-col h-1/4 md:h-auto w-full md:p-4 gap-8 md:mr-auto">
                        <PictureList key={myPostsKey} userId={userId} />

                        <FriendList friendData={friendData} userId={userId} />
                    </div>
                </div>
                <div className="flex flex-col gap-8 md:px-4">
                    <NewPostInput onPostSuccess={handleRefreshPosts} />
                    <PostList
                        key={myPostsKey}
                        userId={userId}
                        isPaginationTriggered={isPaginationTriggered}
                        onPostChange={handleRefreshPosts}
                    />
                </div>
            </div>
        </div>
    );
}
