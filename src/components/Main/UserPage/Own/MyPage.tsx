import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import NewPostInput from '../../NewPostInput/NewPostInput';
import useFriendData from '../../../../hooks/useFriendData';
import FriendList from '../SharedComponents/FriendList/FriendList';
import FriendRequests from './FriendRequests/FriendRequests';
import PictureList from '../SharedComponents/PictureList/PictureList';
import MyPostList from './MyPostList/MyPostList';
import MyCoverSection from './MyCoverSection/MyCoverSection';

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

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    const handleRefreshPosts = () => {
        setMyPostsKey((prevKey) => prevKey + 1); // update state variable to force remount
    };

    useEffect(() => {
        setCurrentView('MyPage');
        localStorage.setItem('currentView', 'MyPage');
    }, []);

    return (
        <div className="flex flex-col lg:w-11/12 rounded-lg bg-card">
            <div className="md:grid grid-cols-5 h-full gap-4">
                <MyCoverSection />
                <div className="col-span-2 flex flex-col lg:h-1/2">
                    {numberOfPendingFriendRequests ? (
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendRequests
                                pendingFriendRequests={pendingFriendRequests}
                            />
                        </div>
                    ) : null}
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <PictureList />
                    </div>
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <FriendList friendData={friendData} />
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-4 md:px-4">
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
