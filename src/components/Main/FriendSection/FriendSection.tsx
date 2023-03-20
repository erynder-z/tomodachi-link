import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';

type setCurrentView = {
    setCurrentView: React.Dispatch<
        React.SetStateAction<CurrentViewType | null>
    >;
};

export default function FriendSection({ setCurrentView }: setCurrentView) {
    useEffect(() => {
        setCurrentView('Friends');
        localStorage.setItem('currentView', 'Friends');
    }, []);

    return <div className="w-full bg-teal-400">Friends</div>;
}
