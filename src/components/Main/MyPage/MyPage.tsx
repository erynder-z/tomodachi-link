import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useUserData from '../../../hooks/useUserData';
import MyPictures from './MyPictures/MyPictures';
import MyFriends from './MyFriends/MyFriends';
import MyPosts from './MyPosts/MyPosts';
import NewPostInput from '../NewPostInput/NewPostInput';

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
            <div className="md:grid grid-cols-3 h-full">
                <div className="col-span-1 flex flex-col h-1/2">
                    <div className="flex h-1/4 md:h-auto">
                        <MyPictures />
                    </div>
                    <div className="flex h-1/4 md:h-auto">
                        <MyFriends />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col ">
                    <NewPostInput />
                    <MyPosts />
                </div>
            </div>
        </div>
    );
}
