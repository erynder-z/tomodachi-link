import { AnimatePresence } from 'framer-motion';
import AppRoutes from '../../AppRoutes';
import Navbar from '../UiElements/Navbar/Navbar';
import OptionsCard from '../UiElements/OptionsCard/OptionsCard';
import ProfileCard from '../UiElements/ProfileCard/ProfileCard';
import Sidebar from '../UiElements/Sidebar/Sidebar';
import { ScrollToTopButton } from '../UiElements/ScrollToTopButton/ScrollToTopButton';
import OverlayHandler from '../UiElements/Overlays/OverlayHandler';
import InfoCard from '../UiElements/InfoCard/InfoCard';
import ScanLinesOverlay from '../UiElements/Overlays/ScanLinesOverlay/ScanLinesOverlay';
import useAuth from '../../hooks/useAuth';
import useCurrentUserData from '../../hooks/useCurrentUserData';
import useInfoCard from '../../hooks/useInfoCard';
import useTheme from '../../hooks/useTheme';
import useNotificationBubblesContext from '../../hooks/useNotificationBubblesContext';
import { useEffect, useRef, useState } from 'react';
import { SearchModeType } from '../../types/searchTypes';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import useScrollToTop from '../../hooks/useScrollToTop';
import { getTimeOfDayMessage } from '../../utilities/getTimeOfDayMessage';
import { InfoType } from '../../types/infoTypes';
import { handleChatSetup } from '../../utilities/handleChatSetup';

const USERDATA_POLLING_INTERVAL = 300000;

/**
 * React component representing the app content when the user is logged in.
 *
 * @component
 * @returns {JSX.Element} JSX Element representing the app content.
 */
export default function MainContent(): JSX.Element {
    const { isAuth, token, tokenExpiration, logout } = useAuth();
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

    // Use this to force a re-render when user data changes
    const userDataKey = `${currentUserData?._id} + ${currentUserData?.lastSeen} `;
    const accountType = currentUserData?.accountType;
    const showScanLines = scanLines !== 'none';
    const shouldLogout = tokenExpiration && tokenExpiration < Date.now();

    /**
     * Start at the top of the page when navigating to a new page
     *
     */
    useScrollToTop();

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
    return (
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
}
