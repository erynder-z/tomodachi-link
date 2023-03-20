import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import InfoOverlay from './components/InfoOverlay/InfoOverlay';
import Navbar from './components/Main/Navbar/Navbar';
import Sidebar from './components/Main/Sidebar/Sidebar';
import FriendList from './components/Main/FriendList/FriendList';
import ProfileCard from './components/Main/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';
import { CurrentViewType } from './types/currentViewType';
import { User } from './types/authContextTypes';
import useAuth from './hooks/useAuth';
import useInfo from './hooks/useInfo';
import RequireAuth from './components/Main/RequireAuth';

function App() {
    const { user, isAuth } = useAuth();
    const { info } = useInfo();

    const [currentView, setCurrentView] = useState<CurrentViewType | null>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) || null
    );
    const [showOverlay, setShowOverlay] = useState(false);

    const isOverlayShown = () => {
        return !!info?.message;
    };

    useEffect(() => {
        setShowOverlay(isOverlayShown());
    }, [info]);

    if (!isAuth) {
        return (
            <>
                <LoginPage />
                <InfoOverlay showOverlay={showOverlay} info={info} />
            </>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-[calc(100%_-_3rem)]">
                <main className="flex flex-1 h-full p-4 bg-green-400">
                    <div className="hidden lg:flex h-fit w-1/4">
                        <ProfileCard />
                    </div>
                    <Routes>
                        <Route element={<RequireAuth />}>
                            <Route
                                path="/"
                                element={<Navigate replace to="/home" />}
                            />
                            <Route
                                path="/home"
                                element={
                                    <HomeSection
                                        setCurrentView={setCurrentView}
                                    />
                                }
                            />
                            <Route
                                path="/friends"
                                element={
                                    <FriendSection
                                        setCurrentView={setCurrentView}
                                    />
                                }
                            />
                        </Route>
                    </Routes>
                </main>
                {currentView != 'Friends' && (
                    <aside className="hidden lg:flex w-1/4 flex-none ">
                        <FriendList />
                    </aside>
                )}
            </div>
            <nav className="flex-none fixed bottom-0 w-full h-12">
                <Navbar />
            </nav>
            <InfoOverlay showOverlay={showOverlay} info={info} />
        </div>
    );
}

export default App;
