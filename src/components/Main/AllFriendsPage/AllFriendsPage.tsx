import React, { useEffect, useRef } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import { useLocation } from 'react-router-dom';
import { FriendDataType } from '../../../types/friendDataType';
import AllFiendsPageItem from './AllFriendsPageItem/AllFriendsPageItem';

type AllFriendsPageProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function AllFriendsPage({
    setCurrentView,
}: AllFriendsPageProps) {
    const shouldSetCurrentView = useRef(true);

    const location = useLocation();
    const friendData = location.state?.friendData; // receive FriendData from Router-Link in "FriendList" component.
    // type: friendData: FriendDataType[] | null;

    const completeFriendList = friendData?.map((friend: FriendDataType) => (
        <AllFiendsPageItem key={friend._id} friendData={friend} />
    ));

    useEffect(() => {
        if (shouldSetCurrentView.current === true) {
            setCurrentView('AllFriendsPage');
            localStorage.setItem('currentView', 'AllFriendsPage');
        }
        return () => {
            shouldSetCurrentView.current = false;
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full p-4 ">
            <h1 className="font-bold mb-4">All friends</h1>
            <div className="flex flex-col md:grid grid-cols-4 gap-4">
                {completeFriendList}
            </div>
        </div>
    );
}
