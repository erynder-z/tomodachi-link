import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';

type FriendSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function FriendSection({ setCurrentView }: FriendSectionProps) {
    useEffect(() => {
        setCurrentView('Friends');
        localStorage.setItem('currentView', 'Friends');
    }, []);

    return (
        <div className="min-h-[calc(100vh_-_5rem)] w-full bg-card">Friends</div>
    );
}
