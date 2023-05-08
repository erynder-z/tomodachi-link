import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Navbar from './components/Main/Navbar/Navbar';
import Sidebar from './components/Main/Sidebar/Sidebar';
import ProfileCard from './components/Main/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';
import { CurrentViewType } from './types/currentViewType';
import useAuth from './hooks/useAuth';
import useInfoCard from './hooks/useInfoCard';
import RequireAuth from './components/Main/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import OptionsCard from './components/Main/OptionsCard/OptionsCard';
import MyPage from './components/Main/UserPage/Own/MyPage';
import UserPage from './components/Main/UserPage/Other/UserPage';
import useCurrentUserData from './hooks/useCurrentUserData';
import InfoCard from './components/InfoCard/InfoCard';

function App() {
    const { isAuth } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { info } = useInfoCard();

    const [currentView, setCurrentView] = useState<CurrentViewType>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) ||
            'Home'
    );
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [lastTouchY, setLastTouchY] = useState<number | null>(null);
    const [isPaginationTriggered, setIsPaginationTriggered] =
        useState<boolean>(false);

    // handle infinite scrolling on desktop devices
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            setIsPaginationTriggered(true);
        }
    };

    // handle infinite scrolling on touch devices
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchY = e.touches[0].clientY;
        const target = e.currentTarget;

        if (lastTouchY && touchY > lastTouchY && target.scrollTop === 0) {
            setIsPaginationTriggered(true);
        }

        setLastTouchY(touchY);
    };

    useEffect(() => {
        setIsPaginationTriggered(false);
    }, [isPaginationTriggered]);

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
                <InfoCard info={info} />
            </>
        );
    }

    return (
        <div className="flex flex-col h-full pb-12">
            <main
                className="flex w-full h-[calc(100vh_-_3rem)] gap-4 md:p-4 bg-background overflow-auto"
                onScroll={handleScroll}
                onTouchMove={handleTouchMove}
            >
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
                                        isPaginationTriggered={
                                            isPaginationTriggered
                                        }
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
                                        key={
                                            currentUserData?.friends.length // use number of friends to trigger component refresh when unfriending a user
                                        }
                                        setCurrentView={setCurrentView}
                                        isPaginationTriggered={
                                            isPaginationTriggered
                                        }
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

            <nav className="flex-none fixed bottom-0 w-full h-12">
                <Navbar />
            </nav>
            <InfoCard info={info} />
        </div>
    );
}

export default App;
