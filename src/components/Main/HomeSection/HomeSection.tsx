import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useFriendData from '../../../hooks/useFriendData';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { FriendDataType } from '../../../types/friendDataType';

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

    const shouldSetCurrentView = useRef(true);

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
        if (shouldSetCurrentView.current === true) {
            setCurrentView('Home');
            localStorage.setItem('currentViewOdinBook', 'Home');
        }
        return () => {
            shouldSetCurrentView.current = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col just min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg">
            <h1 className="text-center text-xl font-bold mb-4">Your feed</h1>
            <Feed
                friendList={friendList}
                isPaginationTriggered={isPaginationTriggered}
            />
        </div>
    );
}
