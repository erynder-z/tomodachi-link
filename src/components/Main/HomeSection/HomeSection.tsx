import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useFriendData from '../../../hooks/useFriendData';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { FriendDataType } from '../../../types/friendDataType';
import ShowPeopleInThisFeed from './ShowPeopleInThisFeed/ShowPeopleInThisFeed';

type HomeSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function HomeSection({
    setCurrentView,
    isPaginationTriggered,
}: HomeSectionProps) {
    const { friendData } = useFriendData();
    const [friendList, setFriendList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const extractFriendIdFromFriendData = (friendData: FriendDataType[]) => {
        const idArray: string[] = [];
        friendData?.map((friend) => {
            idArray.push(friend._id);
        });

        return idArray;
    };

    useEffect(() => {
        if (friendData) {
            setFriendList(extractFriendIdFromFriendData(friendData));
            setLoading(false);
        }
    }, [friendData]);

    useEffect(() => {
        setCurrentView('Home');
        localStorage.setItem('currentView', 'Home');
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card ">
                <h1 className="font-bold">Getting feed...</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-card shadow-lg">
            <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8 bg-card">
                <div className="flex flex-col h-1/4 md:h-auto w-full gap-8 ">
                    <ShowPeopleInThisFeed />
                </div>
                <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 bg-card shadow-lg">
                    <Feed
                        friendList={friendList}
                        isPaginationTriggered={isPaginationTriggered}
                    />
                </div>
            </div>
        </div>
    );
}
