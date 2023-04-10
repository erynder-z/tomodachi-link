import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import InfoOverlay from './components/InfoOverlay/InfoOverlay';
import Navbar from './components/Main/Navbar/Navbar';
import Sidebar from './components/Main/Sidebar/Sidebar';
import ProfileCard from './components/Main/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';
import { CurrentViewType } from './types/currentViewType';
import useAuth from './hooks/useAuth';
import useInfoOverlay from './hooks/useInfoOverlay';
import RequireAuth from './components/Main/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import OptionsCard from './components/Main/OptionsCard/OptionsCard';
import MyPage from './components/Main/MyPage/MyPage';
import UserPage from './components/Main/UserPage/UserPage';

function App() {
    const { isAuth } = useAuth();
    const { info } = useInfoOverlay();

    const [currentView, setCurrentView] = useState<CurrentViewType | null>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) || null
    );
    const [showOverlay, setShowOverlay] = useState(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const isOverlayShown = () => {
        return !!info?.message;
    };

    useEffect(() => {
        setShowOverlay(isOverlayShown());
    }, [info]);

    useEffect(() => {
        if (
            currentView === 'Friends' ||
            currentView === 'MyPage' ||
            currentView === 'OtherUserPage'
        ) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [currentView]);

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
                <main className="flex w-full h-full gap-4 md:p-4 bg-background">
                    <div className="hidden lg:flex flex-col gap-4 h-fit w-1/6">
                        <ProfileCard />
                        <OptionsCard />
                    </div>
                    <div className="flex-1">
                        <Routes>
                            <Route element={<RequireAuth />}>
                                <Route path="*" element={<NotFoundPage />} />
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
                                    path="/mypage"
                                    element={
                                        <MyPage
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
                                <Route
                                    path="/users/:id"
                                    element={
                                        <UserPage
                                            setCurrentView={setCurrentView}
                                        />
                                    }
                                />
                            </Route>
                        </Routes>
                    </div>
                    {showSidebar && (
                        <aside className="hidden lg:flex w-1/4 flex-none">
                            <Sidebar />
                        </aside>
                    )}
                </main>
            </div>
            <nav className="flex-none fixed bottom-0 w-full h-12">
                <Navbar />
            </nav>
            <InfoOverlay showOverlay={showOverlay} info={info} />
        </div>
    );
}

export default App;
