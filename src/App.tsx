import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { fetchUserData } from './utilities/fetchUserData';
import { UserDataType } from './types/userDataType';
import { logout } from './utilities/logout';

function App() {
    const { token, user, isAuth, setToken, setUser, setIsAuth } = useAuth();
    const { info, setInfo } = useInfoOverlay();

    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [currentView, setCurrentView] = useState<CurrentViewType | null>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) || null
    );
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();

    const isOverlayShown = () => {
        return !!info?.message;
    };

    const handleLogout = () => {
        logout({ setToken, setUser, setIsAuth, setUserData });
        window.localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        setShowOverlay(isOverlayShown());
    }, [info]);

    useEffect(() => {
        if (user && token) {
            fetchUserData(token, setUserData, setInfo);
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
                <main className="flex w-full h-full gap-4 p-4 bg-green-400">
                    <div className="hidden lg:flex h-fit w-1/6">
                        <ProfileCard userData={userData} />
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
                                    path="/friends"
                                    element={
                                        <FriendSection
                                            setCurrentView={setCurrentView}
                                        />
                                    }
                                />
                            </Route>
                        </Routes>
                    </div>
                    {currentView != 'Friends' && (
                        <aside className="hidden lg:flex w-1/4 flex-none">
                            <Sidebar />
                        </aside>
                    )}
                </main>
            </div>
            <nav className="flex-none fixed bottom-0 w-full h-12">
                <Navbar handleLogout={handleLogout} />
            </nav>
            <InfoOverlay showOverlay={showOverlay} info={info} />
        </div>
    );
}

export default App;
