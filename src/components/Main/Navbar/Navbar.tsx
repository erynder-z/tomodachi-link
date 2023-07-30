import React, { useEffect, useRef } from 'react';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';
import SearchButton from './SearchButton/SearchButton';
import ChatSectionButton from './ChatSectionButton/ChatSectionButton';

type NavbarProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
        }>
    >;
    conversationsWithUnreadMessages: string[];
};

export default function Navbar({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    conversationsWithUnreadMessages,
}: NavbarProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSearchButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: true,
            editUserDataModal: false,
            mobileOptionsModal: false,
        });
    };

    const closeAllOverlays = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            closeAllOverlays();
        }
    };

    useEffect(() => {
        if (shouldOverlaysShow.mobileOptionsModal) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [menuRef, shouldOverlaysShow.mobileOptionsModal]);

    return (
        <div className="h-full w-full flex justify-between items-center lg:items-start px-2 py-1 lg:py-2 bg-navbar">
            <div className="flex lg:flex-col justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
                <div className="relative">
                    <ChatSectionButton />
                    {conversationsWithUnreadMessages.length > 0 && (
                        <div className="absolute -bottom-1 -right-1">
                            <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                    )}
                </div>
                <SearchButton
                    handleSearchButtonClick={handleSearchButtonClick}
                />
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                        setShouldOverlaysShow({
                            searchOverlay: false,
                            editUserDataModal: false,
                            mobileOptionsModal:
                                !shouldOverlaysShow.mobileOptionsModal,
                        });
                    }}
                >
                    <NavbarUserOptionsButton />
                </button>
            </div>
        </div>
    );
}
