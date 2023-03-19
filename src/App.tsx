import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Main/HomeSection/HomeSection';
import InfoOverlayContext from './contexts/InfoOverlayContext';
import InfoOverlay from './components/InfoOverlay/InfoOverlay';
import Navbar from './components/Main/Navbar/Navbar';
import Sidebar from './components/Main/Sidebar/Sidebar';
import FriendList from './components/Main/FriendList/FriendList';
import ProfileCard from './components/Main/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';

type ProtectedRouteProps = {
    user: any;
    redirectPath?: string;
};

const ProtectedRoute = ({ user, redirectPath = '/' }: ProtectedRouteProps) => {
    return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
    const { user } = useContext(AuthContext);
    const { info } = useContext(InfoOverlayContext);

    const [showOverlay, setShowOverlay] = useState(false);

    const isOverlayShown = () => {
        return !!info?.message;
    };

    useEffect(() => {
        setShowOverlay(isOverlayShown());
    }, [info]);

    if (!user) {
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
                        <Route element={<ProtectedRoute user={user} />}>
                            <Route
                                path="/"
                                element={<Navigate replace to="/home" />}
                            />
                            <Route path="/home" element={<HomeSection />} />
                            <Route
                                path="/friends"
                                element={<FriendSection />}
                            />
                        </Route>
                    </Routes>
                </main>
                <aside className="hidden lg:flex w-1/4 flex-none ">
                    <FriendList />
                </aside>
            </div>
            <nav className="flex-none fixed bottom-0 w-full h-12">
                <Navbar />
            </nav>
            <InfoOverlay showOverlay={showOverlay} info={info} />
        </div>
    );
}

export default App;
