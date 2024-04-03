import LoginContent from './components/Login/LoginContent';
import MainContent from './components/Main/MainContent';
import useAuth from './hooks/useAuth';

/**
 * Main component representing the application.
 *
 * @component
 * @returns {JSX.Element} JSX Element representing the application.
 */
function App(): JSX.Element {
    const { isAuth } = useAuth();

    return isAuth ? <MainContent /> : <LoginContent />;
}

export default App;
