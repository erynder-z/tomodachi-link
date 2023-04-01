import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useUserData from '../../../hooks/useUserData';
import MyPictures from './MyPictures/MyPictures';
import MyFriends from './MyFriends/MyFriends';
import MyPosts from './MyPosts/MyPosts';

type setCurrentView = {
    setCurrentView: React.Dispatch<
        React.SetStateAction<CurrentViewType | null>
    >;
};

export default function MyPage({ setCurrentView }: setCurrentView) {
    const { userData } = useUserData();
    const { first_name, last_name } = userData || {};
    useEffect(() => {
        setCurrentView('MyPage');
        localStorage.setItem('currentView', 'MyPage');
    }, []);

    return (
        <div className="h-full w-full p-4 bg-card">
            <h1 className="text-center font-bold m-4">
                {first_name} {last_name}'s page
            </h1>
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-1 flex flex-col">
                    <MyPictures />
                    <MyFriends />
                </div>
                <div className="col-span-2 flex ">
                    <MyPosts />
                </div>
            </div>
        </div>
    );
}
