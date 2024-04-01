import { useState, useEffect, useRef } from 'react';
import LoginPage from './components/Login/LoginPage';
import Navbar from './components/UiElements/Navbar/Navbar';
import Sidebar from './components/UiElements/Sidebar/Sidebar';
import ProfileCard from './components/UiElements/ProfileCard/ProfileCard';
import useAuth from './hooks/useAuth';
import useInfoCard from './hooks/useInfoCard';
import OptionsCard from './components/UiElements/OptionsCard/OptionsCard';
import useCurrentUserData from './hooks/useCurrentUserData';
import InfoCard from './components/UiElements/InfoCard/InfoCard';
import { ScrollToTopButton } from './components/UiElements/ScrollToTopButton/ScrollToTopButton';
import OverlayHandler from './components/UiElements/Overlays/OverlayHandler';
import { getTimeOfDayMessage } from './utilities/getTimeOfDayMessage';
import { Socket } from 'socket.io-client';
import { Route, Routes, useLocation } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import useNotificationBubblesContext from './hooks/useNotificationBubblesContext';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './AppRoutes';
import ScanLinesOverlay from './components/UiElements/Overlays/ScanLinesOverlay/ScanLinesOverlay';
import { handleChatSetup } from './utilities/handleChatSetup';
import { SearchModeType } from './types/searchTypes';
import { InfoType } from './types/infoTypes';
import useScrollToTop from './hooks/useScrollToTop';
import OAuthCallbackHandler from './components/Login/OAuthCallbackHandler/OAuthCallbackHandler';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { displayErrorInfo } from './components/UiElements/UserNotification/displayErrorInfo';

const USERDATA_POLLING_INTERVAL = 300000;

/**
 * Main component representing the application.
 *
 * @component
 * @returns {JSX.Element} JSX Element representing the application.
 */
function App(): JSX.Element {
    const { isAuth, token, tokenExpiration, logout, setToken } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { info, setInfo } = useInfoCard();

    const { colorScheme, scanLines } = useTheme();
    const {
        setConversationsWithUnreadMessages,
        setMutedConversations,
        setActiveChat,
    } = useNotificationBubblesContext();

    const [shouldUpdateUserData, setShouldUpdateUserData] =
        useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [shouldOverlaysShow, setShouldOverlaysShow] = useState({
        searchOverlay: false,
        editUserDataModal: false,
        mobileOptionsModal: false,
        guestAccountOverlay: false,
        introOverlay: false,
    });
    const [searchMode, setSearchMode] = useState<SearchModeType>('all');
    const [isPaginationTriggered, setIsPaginationTriggered] =
        useState<boolean>(false);

    const socket = useRef<Socket | undefined>(undefined);
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const provider = params.get('provider');
    const code = params.get('code');

    /**
     * Start at the top of the page when navigating to a new page
     *
     */
    useScrollToTop();

    // Use this to force a re-render when user data changes
    const userDataKey = `${currentUserData?._id} + ${currentUserData?.lastSeen} `;
    const accountType = currentUserData?.accountType;
    const showScanLines = scanLines !== 'none';
    const shouldLogout = tokenExpiration && tokenExpiration < Date.now();

    /**
     * Handles the scroll event and checks if pagination is triggered.
     *
     * @param {React.UIEvent<HTMLDivElement>} e - The scroll event.
     */
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

        setIsPaginationTriggered(
            scrollTop + clientHeight >= scrollHeight - 1 ? true : false
        );
    };

    /**
     * Toggles the sidebar display.
     *
     * @return {void} No return value.
     */
    const toggleSidebar = (): void =>
        setShowSidebar((prevShowSidebar) => !prevShowSidebar);

    const displayGreeting = () => {
        const timeOfDayMessage = getTimeOfDayMessage();
        const username = currentUserData?.username;

        setInfo({
            typeOfInfo: timeOfDayMessage.typeOfInfo,
            message: `${timeOfDayMessage.message}  ${username} !`,
            icon: timeOfDayMessage.icon,
        });
    };

    const handleOAuthCallback = async () => {
        if (provider && code) {
            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;

                const response = await fetch(
                    `${SERVER_URL}/api/v1/oauth/redirect?provider=${provider}&code=${code}`,
                    {
                        method: 'GET',
                    }
                );

                if (!response.ok) {
                    const data = await response.json();
                    const errorMessage = data.error.message;
                    displayErrorInfo(setInfo, errorMessage, '👻');

                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();
                setToken(data.token);
            } catch (error: unknown) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        handleOAuthCallback();
    }, [code]);

    /**
     * Closes all open overlays
     */
    const resetOverlays = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
            introOverlay: false,
        });
    };

    /**
     * Resets the pagination trigger state when it is updated.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        setIsPaginationTriggered(false);
    }, [isPaginationTriggered]);

    /**
     * Handles various side effects based on changes in the location pathname.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        setShowSidebar(false);
        if (shouldUpdateUserData) handleFetchUserData();
        if (shouldLogout) {
            const FORCED_LOGOUT_INFO = {
                typeOfInfo: 'bad',
                message: 'Token expired. Please login again.',
                icon: '🚪',
            };

            setInfo(FORCED_LOGOUT_INFO as InfoType);
            logout();
        }

        return () => {
            setShouldUpdateUserData(false);
        };
    }, [location.pathname]);

    /**
     * Handles side effects related to user authentication and data.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (isAuth && currentUserData) {
            if (currentUserData.accountType === 'guest') {
                setShouldOverlaysShow({
                    searchOverlay: false,
                    editUserDataModal: false,
                    mobileOptionsModal: false,
                    guestAccountOverlay: true,
                    introOverlay: false,
                });
            }

            const showIntroOverlay =
                currentUserData.hasAcceptedTOS === false ||
                currentUserData.hasAcceptedTOS === undefined;

            showIntroOverlay
                ? setShouldOverlaysShow((prev) => ({
                      ...prev,
                      introOverlay: showIntroOverlay,
                  }))
                : displayGreeting();

            if (currentUserData.accountType !== 'guest') {
                const cleanupSocket = handleChatSetup(
                    socket,
                    token,
                    currentUserData,
                    setConversationsWithUnreadMessages,
                    setMutedConversations,
                    setInfo
                );

                return () => {
                    setActiveChat(null);
                    cleanupSocket();
                };
            }
        }
    }, [isAuth && currentUserData?._id]);

    /**
     * Sets up a polling interval to update user data at regular intervals.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setShouldUpdateUserData(true);
        }, USERDATA_POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    /**
     * Content if the user is not authenticated.
     *
     * @type {JSX.Element}
     */
    const LoginContent = (
        <>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<LoginPage />} />
                {/*   <Route path="/oauth" element={<OAuthCallbackHandler />} /> */}
            </Routes>
            <InfoCard info={info} />
        </>
    );

    /**
     * Content if the user is authenticated.
     *
     * @type {JSX.Element}
     */
    const AppContent = (
        <div
            key={userDataKey}
            className={`font-regularFont subpixel-antialiased text-regularText dark:text-regularTextDark flex flex-col lg:flex-row h-full pb-12 lg:pb-0 ${colorScheme}`}
        >
            <div className="relative">
                <nav className="flex-none fixed bottom-0 w-full h-12 lg:sticky lg:top-0 lg:bottom-auto lg:w-auto lg:h-screen bg-background1 dark:bg-background1Dark">
                    <Navbar
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                        setSearchMode={setSearchMode}
                    />
                </nav>
            </div>
            <main
                id="container-main"
                className="relative block md:flex h-[calc(100vh_-_3rem)] lg:h-screen w-screen gap-4 lg:p-4 bg-background1 dark:bg-background1Dark overflow-y-auto"
                onScroll={handleScroll}
            >
                <div className="hidden lg:flex flex-col gap-4 w-1/6 lg:sticky lg:top-0">
                    <ProfileCard socket={socket.current} />
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                        resetOverlays={resetOverlays}
                    />
                </div>

                <div className="relative flex-1 max-w-3xl">
                    <AnimatePresence>
                        <AppRoutes
                            location={location}
                            isPaginationTriggered={isPaginationTriggered}
                            accountType={accountType}
                            socket={socket.current}
                            userDataKey={userDataKey}
                            setShouldOverlaysShow={setShouldOverlaysShow}
                            setSearchMode={setSearchMode}
                        />
                    </AnimatePresence>
                </div>

                <Sidebar
                    showSidebar={showSidebar}
                    toggleSidebar={toggleSidebar}
                    socket={socket.current}
                    setShouldOverlaysShow={setShouldOverlaysShow}
                    setSearchMode={setSearchMode}
                />

                <ScrollToTopButton />
            </main>

            <OverlayHandler
                resetOverlays={resetOverlays}
                shouldOverlaysShow={shouldOverlaysShow}
                setShouldOverlaysShow={setShouldOverlaysShow}
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
                searchMode={searchMode}
                displayGreeting={displayGreeting}
            />

            <InfoCard info={info} />
            {showScanLines && <ScanLinesOverlay />}
        </div>
    );

    /**
     * Renders the App component based on the users authentication state.
     *
     * @return {JSX.Element} The rendered App component.
     */
    return isAuth ? AppContent : LoginContent;
}

export default App;
