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
import useInfoOverlay from './hooks/useInfoOverlay';
import RequireAuth from './components/Main/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { FaExclamationTriangle } from 'react-icons/fa';

function App() {
    const { token, user, isAuth } = useAuth();
    const { info, setInfo } = useInfoOverlay();

    const [userData, setUserData] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<CurrentViewType | null>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) || null
    );
    const [showOverlay, setShowOverlay] = useState(false);

    const isOverlayShown = () => {
        return !!info?.message;
    };

    const fetchUserData = async (userId: string) => {
        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const res = await fetch(`${serverURL}/api/v1/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setUserData(data.user);
            } else {
                const data = await res.json();
                const errorMessage = data.error.message;

                setInfo({
                    message: errorMessage,
                    icon: <FaExclamationTriangle />,
                });
            }
        } catch (err: unknown) {
            setInfo({
                message: 'Unable to fetch userdata!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    useEffect(() => {
        setShowOverlay(isOverlayShown());
    }, [info]);

    useEffect(() => {
        if (user) {
            const id = structuredClone(user).user._id;
            fetchUserData(id);
        }
    }, [isAuth]);

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
