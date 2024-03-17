import { useEffect, useRef } from 'react';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import FeedSectionButton from './FeedSectionButton/FeedSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';
import SearchButton from './SearchButton/SearchButton';
import ChatSectionButton from './ChatSectionButton/ChatSectionButton';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';
import PollSectionButton from './PollSectionButton/PollSectionButton';
import { SearchModeType } from '../../../types/searchTypes';
import HelpSectionButton from './HelpSectionButton/HelpSectionButton';

type NavbarProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
        introOverlay: boolean;
    };
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
 * React component representing the main navigation bar.
 *
 * @component
 * @param {object} props - The properties of the Navbar component.
 * @param {object} props.shouldOverlaysShow - Object containing flags for showing various overlays.
 * @param {boolean} props.shouldOverlaysShow.searchOverlay - Flag for showing the search overlay.
 * @param {boolean} props.shouldOverlaysShow.editUserDataModal - Flag for showing the user data editing modal.
 * @param {boolean} props.shouldOverlaysShow.mobileOptionsModal - Flag for showing the mobile options modal.
 * @param {boolean} props.shouldOverlaysShow.guestAccountOverlay - Flag for showing the guest account overlay.
 * @param {React.Dispatch} props.setShouldOverlaysShow - Function to set the state of shouldOverlaysShow.
 * @param {React.Dispatch} props.setSearchMode - Function to set the search mode.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    setSearchMode,
}: NavbarProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { conversationsWithUnreadMessages, mutedConversations } =
        useNotificationBubblesContext();
    const menuRef = useRef<HTMLDivElement>(null);

    const isChatDisabled = currentUserData?.accountType === 'guest';
    const unmutedConversations = conversationsWithUnreadMessages?.filter(
        (conversation) => !mutedConversations.includes(conversation)
    );
    const shouldUnreadBubbleShow = unmutedConversations?.length > 0;

    /**
     * Handles the click event when the search button is clicked.
     *
     * @function
     * @returns {void}
     */
    const handleSearchButtonClick = (): void => {
        setShouldOverlaysShow({
            searchOverlay: true,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
            introOverlay: false,
        });
        setSearchMode('all');
    };

    /**
     * Closes all overlays when clicking outside the menu.
     *
     * @function
     * @returns {void}
     */
    const closeAllOverlays = (): void => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
            introOverlay: false,
        });
    };

    /**
     * Handles the click outside event to close the overlays.
     *
     * @function
     * @param {MouseEvent} event - The click event.
     * @returns {void}
     */
    const handleClickOutside = (event: MouseEvent): void => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node))
            closeAllOverlays();
    };

    /**
     * Sets up event listener for clicks outside the menu when mobile options modal is open.
     *
     * @effect
     */
    useEffect(() => {
        if (shouldOverlaysShow.mobileOptionsModal)
            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, shouldOverlaysShow.mobileOptionsModal]);

    /**
     * Button component for mobile options.
     *
     * @type {JSX.Element}
     */
    const MobileOptionsButton: JSX.Element = (
        <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
                setShouldOverlaysShow({
                    searchOverlay: false,
                    editUserDataModal: false,
                    mobileOptionsModal: !shouldOverlaysShow.mobileOptionsModal,
                    guestAccountOverlay: false,
                    introOverlay: false,
                });
            }}
        >
            <NavbarUserOptionsButton />
        </button>
    );

    /**
     * Render the Navbar component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="h-12 lg:h-full w-screen md:w-full flex justify-between items-center lg:items-start px-2 py-1 lg:py-2 bg-navbar dark:bg-navbarDark text-regularText dark:text-regularTextDark">
            <div className="flex lg:flex-col h-full justify-center items-center gap-4">
                <FeedSectionButton />
                <FriendSectionButton />
                <PollSectionButton />
                <div className="relative flex justify-center items-center">
                    <ChatSectionButton isChatDisabled={isChatDisabled} />
                    {shouldUnreadBubbleShow && (
                        <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-regularText dark:bg-regularTextDark opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-highlight dark:bg-highlightDark"></span>
                        </div>
                    )}
                </div>
                <SearchButton
                    handleSearchButtonClick={handleSearchButtonClick}
                />
                <div className="flex justify-center items-center lg:mt-auto">
                    <HelpSectionButton />
                </div>
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                {MobileOptionsButton}
            </div>
        </div>
    );
}
