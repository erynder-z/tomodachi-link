import React, { useEffect, useRef } from 'react';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';
import SearchButton from './SearchButton/SearchButton';
import ChatSectionButton from './ChatSectionButton/ChatSectionButton';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';

type NavbarProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};

export default function Navbar({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: NavbarProps) {
    const { currentUserData } = useCurrentUserData();
    const { conversationsWithUnreadMessages, mutedConversations } =
        useNotificationBubblesContext();
    const menuRef = useRef<HTMLDivElement>(null);

    const isChatDisabled = currentUserData?.accountType === 'guest';
    const unmutedConversations = conversationsWithUnreadMessages.filter(
        (conversation) => !mutedConversations.includes(conversation)
    );
    const shouldUnreadBubbleShow = unmutedConversations.length > 0;

    const handleSearchButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: true,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    const closeAllOverlays = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node))
            closeAllOverlays();
    };

    useEffect(() => {
        if (shouldOverlaysShow.mobileOptionsModal)
            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, shouldOverlaysShow.mobileOptionsModal]);

    const MobileOptionsButton = (
        <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
                setShouldOverlaysShow({
                    searchOverlay: false,
                    editUserDataModal: false,
                    mobileOptionsModal: !shouldOverlaysShow.mobileOptionsModal,
                    guestAccountOverlay: false,
                });
            }}
        >
            <NavbarUserOptionsButton />
        </button>
    );

    return (
        <div className="h-12 lg:h-full w-screen md:w-full flex justify-between items-center lg:items-start px-2 py-1 lg:py-2 bg-navbar dark:bg-navbarDark text-regularText dark:text-regularTextDark">
            <div className="flex lg:flex-col justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
                <div className="relative">
                    <ChatSectionButton isChatDisabled={isChatDisabled} />
                    {shouldUnreadBubbleShow && (
                        <div className="absolute -bottom-1 -right-1">
                            <div className="w-3 h-3 bg-highlight dark:bg-highlightDark rounded-full animate-pulse   " />
                        </div>
                    )}
                </div>
                <SearchButton
                    handleSearchButtonClick={handleSearchButtonClick}
                />
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                {MobileOptionsButton}
            </div>
        </div>
    );
}
