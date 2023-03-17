import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';
import InfoOverlayContext from './contexts/InfoOverlayContext';
import InfoOverlay from './components/InfoOverlay/InfoOverlay';

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
        <div>
            <main>
                <Routes>
                    <Route element={<ProtectedRoute user={user} />}>
                        <Route
                            path="/"
                            element={<Navigate replace to="/home" />}
                        />
                        <Route path="/home" element={<Home />} />
                    </Route>
                </Routes>
            </main>
            <InfoOverlay showOverlay={showOverlay} info={info} />
        </div>
    );
}

export default App;
