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
import ScrollToTop from './utilities/ScrollToTop';
import { ScrollToTopButton } from './components/UiElements/ScrollToTopButton/ScrollToTopButton';
import OverlayHandler from './components/UiElements/Overlays/OverlayHandler';
import { getTimeOfDayMessage } from './utilities/getTimeOfDayMessage';
import { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { handleChatSetup } from './utilities/handleChatSetup';
import useTheme from './hooks/useTheme';
import useNotificationBubblesContext from './hooks/useNotificationBubblesContext';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './AppRoutes';
import ScanLinesOverlay from './components/UiElements/Overlays/ScanLinesOverlay/ScanLinesOverlay';

function App() {
    const { isAuth, token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { info, setInfo } = useInfoCard();

    const { colorScheme, scanLines } = useTheme();
    const {
        setConversationsWithUnreadMessages,
        setMutedConversations,
        setActiveChat,
    } = useNotificationBubblesContext();

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [shouldOverlaysShow, setShouldOverlaysShow] = useState({
        searchOverlay: false,
        editUserDataModal: false,
        mobileOptionsModal: false,
        guestAccountOverlay: false,
    });
    const [isPaginationTriggered, setIsPaginationTriggered] =
        useState<boolean>(false);

    const socket = useRef<Socket | undefined>(undefined);
    const location = useLocation();

    // Use this to force a re-render when user data changes
    const userDataKey = `${currentUserData?._id} + ${currentUserData?.lastSeen}`;

    const accountType = currentUserData?.accountType;

    const showScanLines = scanLines === 'matrix';

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

        setIsPaginationTriggered(
            scrollTop + clientHeight >= scrollHeight - 1 ? true : false
        );
    };

    const toggleSidebar = () =>
        setShowSidebar((prevShowSidebar) => !prevShowSidebar);

    useEffect(() => {
        setIsPaginationTriggered(false);
    }, [isPaginationTriggered]);

    useEffect(() => {
        setShowSidebar(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isAuth && currentUserData) {
            if (currentUserData.accountType === 'guest') {
                setShouldOverlaysShow({
                    searchOverlay: false,
                    editUserDataModal: false,
                    mobileOptionsModal: false,
                    guestAccountOverlay: true,
                });
            }
            const timeOfDayMessage = getTimeOfDayMessage();
            const username = currentUserData.firstName;

            setInfo({
                typeOfInfo: timeOfDayMessage.typeOfInfo,
                message: `${timeOfDayMessage.message}  ${username} !`,
                icon: timeOfDayMessage.icon,
            });

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

    const LoginContent = (
        <>
            <LoginPage />
            <InfoCard info={info} />
        </>
    );

    const AppContent = (
        <div
            key={userDataKey}
            className={`font-regularFont text-regularText dark:text-regularTextDark flex flex-col lg:flex-row h-full pb-12 lg:pb-0 ${colorScheme}`}
        >
            <div className="relative">
                <nav className="flex-none fixed bottom-0 w-full h-12 lg:sticky lg:top-0 lg:bottom-auto lg:w-auto lg:h-screen bg-background1 dark:bg-background1Dark">
                    <Navbar
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </nav>
            </div>
            <main
                id="container-main"
                className="relative block md:flex h-[calc(100vh_-_3rem)] lg:h-screen w-screen gap-4 md:p-4 bg-background1 dark:bg-background1Dark overflow-y-auto"
                onScroll={handleScroll}
            >
                <ScrollToTop />
                <div className="hidden lg:flex flex-col gap-4 w-1/6 lg:sticky lg:top-0">
                    <ProfileCard socket={socket.current} />
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </div>

                <div className="relative flex-1 max-w-3xl z-10">
                    <AnimatePresence>
                        <AppRoutes
                            location={location}
                            isPaginationTriggered={isPaginationTriggered}
                            accountType={accountType}
                            socket={socket.current}
                            userDataKey={userDataKey}
                        />
                    </AnimatePresence>
                </div>
                <Sidebar
                    showSidebar={showSidebar}
                    toggleSidebar={toggleSidebar}
                    socket={socket.current}
                />
                <ScrollToTopButton />
            </main>

            <OverlayHandler
                shouldOverlaysShow={shouldOverlaysShow}
                setShouldOverlaysShow={setShouldOverlaysShow}
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
            />

            <InfoCard info={info} />
            {showScanLines && <ScanLinesOverlay />}
        </div>
    );

    return isAuth ? AppContent : LoginContent;
}

export default App;
