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
    return (
        <div className="min-h-[calc(100vh_-_5rem)] w-full bg-card">Home</div>
    );
}
