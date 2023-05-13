import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import NewPostInput from '../../NewPostInput/NewPostInput';
import useFriendData from '../../../../hooks/useFriendData';
import FriendList from '../SharedComponents/FriendList/FriendList';
import FriendRequests from './FriendRequests/FriendRequests';
import MyPostList from './MyPostList/MyPostList';
import MyCoverSection from './MyCoverSection/MyCoverSection';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import PictureList from '../SharedComponents/PictureList/PictureList';

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
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] p-4 md:p-0 pb-4  lg:w-11/12 bg-card shadow-lg">
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
                } flex flex-col grid-cols-10 h-full gap-8`}
            >
                <MyCoverSection onFetchComplete={onFetchComplete} />
                <div className="col-span-4 flex flex-col lg:h-1/2">
                    {numberOfPendingFriendRequests ? (
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendRequests
                                pendingFriendRequests={pendingFriendRequests}
                            />
                        </div>
                    ) : null}
                    <div className="flex flex-col h-1/4 md:h-auto md:p-4 gap-8">
                        <PictureList userId={currentUserData?._id} />

                        <FriendList friendData={friendData} />
                    </div>
                </div>
                <div className="col-start-5 col-span-6 flex flex-col gap-8 md:px-4">
                    <NewPostInput onPostSuccess={handleRefreshPosts} />
                    <MyPostList
                        key={myPostsKey}
                        isPaginationTriggered={isPaginationTriggered}
                    />
                </div>
            </div>
        </div>
    );
}
