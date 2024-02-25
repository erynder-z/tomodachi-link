import { RefObject, useRef } from 'react';
import ChatHelp from './HelpContent/ChatHelp';
import FeedHelp from './HelpContent/FeedHelp';
import FriendsHelp from './HelpContent/FriendsHelp';
import PollHelp from './HelpContent/PollHelp';
import PostsHelp from './HelpContent/PostsHelp';
import SearchHelp from './HelpContent/SearchHelp';
import SettingsHelp from './HelpContent/SettingsHelp';
import UserPageHelp from './HelpContent/UserPageHelp';
import SourceCodeHelp from './HelpContent/SourceCodeHelp';

export default function HelpPage() {
    const feedRef = useRef(null);
    const friendRef = useRef(null);
    const chatRef = useRef(null);
    const postsRef = useRef(null);
    const pollRef = useRef(null);
    const searchRef = useRef(null);
    const userPageRef = useRef(null);
    const settingsRef = useRef(null);
    const sourceCodeRef = useRef(null);

    const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="p-4 text-regularText dark:text-regularTextDark">
            <h1 className="text-center text-3xl ">
                Thank you very much for using Tomodachi-Link!
            </h1>
            <p>
                Below, you will find some help regarding the features of
                Tomodachi-Link.
            </p>
            <ul className="mb-8">
                <li
                    onClick={() => scrollToRef(feedRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Feed
                </li>
                <li
                    onClick={() => scrollToRef(friendRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Friend
                </li>
                <li
                    onClick={() => scrollToRef(chatRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Chat
                </li>
                <li
                    onClick={() => scrollToRef(postsRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Posts
                </li>
                <li
                    onClick={() => scrollToRef(pollRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Polls
                </li>
                <li
                    onClick={() => scrollToRef(searchRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Search
                </li>
                <li
                    onClick={() => scrollToRef(userPageRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    User page
                </li>
                <li
                    onClick={() => scrollToRef(settingsRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Settings
                </li>
                <li
                    onClick={() => scrollToRef(sourceCodeRef)}
                    className="text-teal-500 hover:text-teal-400 cursor-pointer"
                >
                    Source code
                </li>
            </ul>
            <div className="flex flex-col justify-center gap-8">
                <div ref={feedRef}>
                    <FeedHelp />
                </div>
                <div ref={friendRef}>
                    <FriendsHelp />
                </div>
                <div ref={chatRef}>
                    <ChatHelp />
                </div>
                <div ref={postsRef}>
                    <PostsHelp />
                </div>
                <div ref={pollRef}>
                    <PollHelp />
                </div>
                <div ref={searchRef}>
                    <SearchHelp />
                </div>
                <div ref={userPageRef}>
                    <UserPageHelp />
                </div>
                <div ref={settingsRef}>
                    <SettingsHelp />
                </div>
                <div ref={sourceCodeRef}>
                    <SourceCodeHelp />
                </div>
            </div>
        </div>
    );
}
