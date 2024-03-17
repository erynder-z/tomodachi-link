import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import FriendSection from './components/Main/FriendSection/FriendSection';
import FeedSection from './components/Main/FeedSection/FeedSection';
import RequireAuth from './components/Main/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import MyPage from './components/Main/UserPage/Own/MyPage';
import UserPage from './components/Main/UserPage/Other/UserPage';
import Gallery from './components/Main/Gallery/Gallery';
import AllFriendsPage from './components/Main/UserPage/SharedComponents/AllFriendsPage/AllFriendsPage';
import Chat from './components/Main/Chat/Chat';
import PollSectionSelect from './components/Main/PollSection/PollSectionSelect/PollSectionSelect';
import NewPollSection from './components/Main/PollSection/NewPollSection/NewPollSection';
import PollList from './components/Main/PollSection/PollList/PollList';
import SinglePostPage from './components/Main/Post/SinglePostPage/SinglePostPage';
import SinglePollPage from './components/Main/Poll/SinglePollPage/SinglePollPage';
import { SearchModeType } from './types/searchTypes';
import HelpPage from './components/Main/Help/HelpPage';

type AppRoutesProps = {
    location: ReturnType<typeof useLocation>;
    isPaginationTriggered: boolean;
    accountType: 'guest' | 'regularUser' | undefined;
    socket: Socket | undefined;
    userDataKey: string;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
            introOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

/**
 * Renders the routes for the application.
 *
 * @component
 * @param {AppRoutesProps} props - The component props.
 * @returns {JSX.Element} JSX Element representing the application routes.
 */
export default function AppRoutes({
    location,
    isPaginationTriggered,
    accountType,
    socket,
    userDataKey,
    setShouldOverlaysShow,
    setSearchMode,
}: AppRoutesProps): JSX.Element {
    return (
        <Routes key={location.pathname} location={location}>
            <Route element={<RequireAuth />}>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<Navigate replace to="/feed" />} />
                <Route
                    path="/feed"
                    element={
                        <FeedSection
                            isPaginationTriggered={isPaginationTriggered}
                            setShouldOverlaysShow={setShouldOverlaysShow}
                            setSearchMode={setSearchMode}
                        />
                    }
                />
                <Route
                    path="/mypage"
                    element={
                        <MyPage isPaginationTriggered={isPaginationTriggered} />
                    }
                />
                <Route path="/friends" element={<FriendSection />} />
                <Route path="/polls" element={<PollSectionSelect />} />
                <Route
                    path="/polls/list"
                    element={
                        <PollList
                            isPaginationTriggered={isPaginationTriggered}
                            setShouldOverlaysShow={setShouldOverlaysShow}
                            setSearchMode={setSearchMode}
                        />
                    }
                />
                <Route path="/polls/new" element={<NewPollSection />} />
                <Route
                    path="/chat"
                    element={
                        accountType === 'guest' ? (
                            <Navigate replace to="/feed" />
                        ) : (
                            <Chat socket={socket} />
                        )
                    }
                />
                <Route
                    path="/users/:id"
                    element={
                        <UserPage
                            key={userDataKey}
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    }
                />
                <Route
                    path="/users/:id/gallery"
                    element={
                        <Gallery
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    }
                />
                <Route
                    path="/users/:id/friends/list"
                    element={<AllFriendsPage />}
                />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/post/:id" element={<SinglePostPage />} />
                <Route path="/poll/:id" element={<SinglePollPage />} />
            </Route>
        </Routes>
    );
}
