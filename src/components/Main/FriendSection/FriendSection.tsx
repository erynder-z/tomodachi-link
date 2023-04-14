import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';

type setCurrentView = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function FriendSection({ setCurrentView }: setCurrentView) {
    useEffect(() => {
        setCurrentView('Friends');
        localStorage.setItem('currentView', 'Friends');
    }, []);

    return <div className="h-full w-full bg-card">Friends</div>;
}
