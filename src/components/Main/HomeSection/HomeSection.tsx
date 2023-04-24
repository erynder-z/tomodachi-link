import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';

type HomeSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function HomeSection({ setCurrentView }: HomeSectionProps) {
    useEffect(() => {
        setCurrentView('Home');
        localStorage.setItem('currentView', 'Home');
    }, []);
    return <div className="h-full w-full bg-card">Home</div>;
}
