import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';

type setCurrentView = {
    setCurrentView: React.Dispatch<
        React.SetStateAction<CurrentViewType | null>
    >;
};

export default function HomeSection({ setCurrentView }: setCurrentView) {
    useEffect(() => {
        setCurrentView('Home');
        localStorage.setItem('currentView', 'Home');
    }, []);
    return <div className="w-full bg-orange-400">Home</div>;
}
