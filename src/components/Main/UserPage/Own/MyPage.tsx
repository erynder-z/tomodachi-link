import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useUserData from '../../../../hooks/useUserData';
import NewPostInput from '../../NewPostInput/NewPostInput';
import useFriendData from '../../../../hooks/useFriendData';
import FriendList from '../SharedComponents/FriendList/FriendList';
import FriendRequests from './FriendRequests/FriendRequests';
import PictureList from '../SharedComponents/PictureList/PictureList';
import PostList from '../SharedComponents/PostList/PostList';
import MyPostList from './MyPostList/MyPostList';

type props = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function MyPage({
    setCurrentView,
    isPaginationTriggered,
}: props) {
    const { userData } = useUserData();
    const { friendData } = useFriendData();
    const { pending_friend_requests } = userData || {};
    const [myPostsKey, setMyPostsKey] = useState(0);

    const numberOfPendingFriendRequests = pending_friend_requests?.length;

    const handleRefreshPosts = () => {
        setMyPostsKey((prevKey) => prevKey + 1); // update state variable to force remount
    };

    useEffect(() => {
        setCurrentView('MyPage');
        localStorage.setItem('currentView', 'MyPage');
    }, []);

    return (
        <div className="flex flex-col lg:w-11/12 p-4 bg-card">
            <div className="md:grid grid-cols-5 h-full gap-4">
                <div className="h-96 col-span-5 grid grid-rows-4">
                    <div className="row-span-3 flex h-full p-4 gap-4 bg-blue-300"></div>
                    <div className="relative row-span-1 flex gap-4 px-4 bg-slate-300">
                        <div className="flex flex-col justify-center w-full">
                            <h1 className="text-center font-bold h-auto">
                                My Page
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col lg:h-1/2">
                    {numberOfPendingFriendRequests ? (
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendRequests
                                pendingFriendRequests={pending_friend_requests}
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
