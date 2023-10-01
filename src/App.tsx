import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Navbar from './components/UiElements/Navbar/Navbar';
import Sidebar from './components/UiElements/Sidebar/Sidebar';
import ProfileCard from './components/UiElements/ProfileCard/ProfileCard';
import FriendSection from './components/Main/FriendSection/FriendSection';
import HomeSection from './components/Main/HomeSection/HomeSection';
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
import { AnimatePresence } from 'framer-motion';
import PollSectionSelect from './components/Main/PollSection/PollSectionSelect/PollSectionSelect';
import NewPollSection from './components/Main/PollSection/NewPollSection/NewPollSection';
import PollList from './components/Main/PollSection/PollList/PollList';

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
    const numberOfFriends = currentUserData?.friends.length;

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

    const LoginContent = (
        <>
            <LoginPage />
            <InfoCard info={info} />
        </>
    );

    const AppContent = (
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
                <div className="hidden lg:flex flex-col gap-4 w-1/6 lg:sticky lg:top-0">
                    <ProfileCard socket={socket.current} />
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </div>

                <div className="relative flex-1 max-w-3xl z-10">
                    <AnimatePresence>
                        <Routes key={location.pathname} location={location}>
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
                                            isPaginationTriggered={
                                                isPaginationTriggered
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/friends"
                                    element={<FriendSection />}
                                />
                                <Route
                                    path="/polls"
                                    element={<PollSectionSelect />}
                                />
                                <Route
                                    path="/polls/list"
                                    element={
                                        <PollList
                                            isPaginationTriggered={
                                                isPaginationTriggered
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/polls/new"
                                    element={<NewPollSection />}
                                />
                                <Route
                                    path="/chat"
                                    element={
                                        accountType === 'guest' ? (
                                            <Navigate replace to="/home" />
                                        ) : (
                                            <Chat socket={socket.current} />
                                        )
                                    }
                                />
                                <Route
                                    path="/users/:id"
                                    element={
                                        <UserPage
                                            key={`userPage + ${numberOfFriends}`} // use number of friends to trigger component refresh when unfriending a user
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
                                            isPaginationTriggered={
                                                isPaginationTriggered
                                            }
                                        />
                                    }
                                />
                            </Route>
                        </Routes>
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
        </div>
    );

    return isAuth ? AppContent : LoginContent;
}

export default App;
