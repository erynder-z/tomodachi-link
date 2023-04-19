import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useUserData from '../../../hooks/useUserData';
import MyPictures from './MyPictures/MyPictures';
import MyFriends from './MyFriends/MyFriends';
import MyPosts from './MyPosts/MyPosts';
import NewPostInput from '../NewPostInput/NewPostInput';
import MyFriendRequests from './MyFriendRequests/MyFriendRequests';
import useFriendData from '../../../hooks/useFriendData';

type setCurrentView = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function MyPage({ setCurrentView }: setCurrentView) {
    const { userData } = useUserData();
    const { friendData } = useFriendData();
    const { first_name, last_name, pending_friend_requests } = userData || {};
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
        <div className="flex flex-col h-full lg:w-11/12 p-4 bg-card">
            <div
                className="md:grid grid-cols-4 h-full gap-4"
                style={{ gridTemplateRows: '5% auto' }}
            >
                <h1 className="col-span-4 text-center font-bold h-auto">
                    {first_name} {last_name}'s page
                </h1>
                <div className="col-span-2 flex flex-col lg:h-1/2">
                    {numberOfPendingFriendRequests ? (
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <MyFriendRequests
                                pendingFriendRequests={pending_friend_requests}
                            />
                        </div>
                    ) : null}
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <MyPictures />
                    </div>
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <MyFriends friendData={friendData} />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-4 md:px-4 overflow-auto">
                    <NewPostInput onPostSuccess={handleRefreshPosts} />
                    <MyPosts key={myPostsKey} />
                </div>
            </div>
        </div>
    );
}
