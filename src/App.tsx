import { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';

type ProtectedRouteProps = {
    user: any;
    redirectPath?: string;
};

const ProtectedRoute = ({ user, redirectPath = '/' }: ProtectedRouteProps) => {
    return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
    const { user, isAuth } = useContext(AuthContext);

    if (!user) {
        return <LoginPage />;
    }

    if (!isAuth) {
        return <p className="loading">Loading...</p>;
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
        </div>
    );
}

export default App;
