import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Navbar from './components/UiElements/Navbar/Navbar';
import Sidebar from './components/UiElements/Sidebar/Sidebar';
import ProfileCard from './components/UiElements/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';
import { CurrentViewType } from './types/currentViewType';
import useAuth from './hooks/useAuth';
import useInfoCard from './hooks/useInfoCard';
import RequireAuth from './components/Main/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import OptionsCard from './components/UiElements/OptionsCard/OptionsCard';
import MyPage from './components/Main/UserPage/Own/MyPage';
import UserPage from './components/Main/UserPage/Other/UserPage';
import useCurrentUserData from './hooks/useCurrentUserData';
import InfoCard from './components/UiElements/InfoCard/InfoCard';
import Gallery from './components/Main/Gallery/Gallery';
import AllFriendsPage from './components/Main/UserPage/SharedComponents/AllFriendsPage/AllFriendsPage';
import ScrollToTop from './utilities/ScrollToTop';
import { ScrollToTopButton } from './components/UiElements/ScrollToTopButton/ScrollToTopButton';
import OverlayHandler from './components/UiElements/Overlays/OverlayHandler';
import { getTimeOfDayMessage } from './utilities/getTimeOfDayMessage';
import Chat from './components/Main/Chat/Chat';
import { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { handleChatSetup } from './utilities/handleChatSetup';
import useTheme from './hooks/useTheme';
import useNotificationBubblesContext from './hooks/useNotificationBubblesContext';

function App() {
    const { isAuth, token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { info, setInfo } = useInfoCard();
    const { theme } = useTheme();
    const {
        setConversationsWithUnreadMessages,
        setMutedConversations,
        setActiveChat,
    } = useNotificationBubblesContext();

    const [currentView, setCurrentView] = useState<CurrentViewType>(
        (localStorage.getItem('odinbookCurrentView') as CurrentViewType) ||
            'Home'
    );
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

    const accountType = currentUserData?.accountType;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

        setIsPaginationTriggered(
            scrollTop + clientHeight >= scrollHeight - 1 ? true : false
        );
    };

    const toggleSidebar = () => {
        setShowSidebar((prevShowSidebar) => !prevShowSidebar);
    };

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
    }, [isAuth && currentUserData?._id]);

    if (!isAuth) {
        return (
            <>
                <LoginPage />
                <InfoCard info={info} />
            </>
        );
    }

    return (
        <div
            className={`font-regularFont text-regularText dark:text-regularTextDark flex flex-col lg:flex-row h-full pb-12 lg:pb-0 ${theme}`}
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
                <div className="hidden lg:flex flex-col gap-4  w-1/6 lg:sticky lg:top-1">
                    <ProfileCard socket={socket.current} />
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </div>

                <div className="relative flex-1 max-w-3xl z-10">
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
                                        isPaginationTriggered={
                                            isPaginationTriggered
                                        }
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
                                path="/chat"
                                element={
                                    accountType === 'guest' ? (
                                        <Navigate replace to="/home" />
                                    ) : (
                                        <Chat
                                            setCurrentView={setCurrentView}
                                            socket={socket.current}
                                        />
                                    )
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
                            <Route
                                path="/users/:id/gallery"
                                element={
                                    <Gallery
                                        setCurrentView={setCurrentView}
                                        isPaginationTriggered={
                                            isPaginationTriggered
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/users/:id/friends/list"
                                element={
                                    <AllFriendsPage
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
                <Sidebar
                    currentView={currentView}
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
        </div>
    );
}

export default App;
