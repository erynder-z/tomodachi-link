import { Tooltip } from 'react-tooltip';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useTheme from '../../../../hooks/useTheme';

/**
 * React component for rendering the user options button in the navbar.
 *
 * @component
 * @returns {JSX.Element} The rendered NavbarUserOptionsButton component.
 */
export default function NavbarUserOptionsButton(): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { isMobileDevice } = useTheme();
    const { userpic, pendingFriendRequests } = currentUserData || {};
    const userImage = userpic ? userpic.data : undefined;

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    /**
     * Loading content for the user options button while user data is being fetched.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="w-8 h-8 object-cover rounded-full mx-auto bg-gray-600/50 animate-pulse"></div>
    );

    /**
     * The main content of the NavbarUserOptionsButton component, displaying the user's avatar and
     * a notification badge for pending friend requests (if any).
     *
     * @type {JSX.Element}
     */
    const NavbarUserOptionsButton: JSX.Element = (
        <>
            <div
                data-tooltip-id="navbar-user-options-tooltip"
                data-tooltip-content="View options"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                className="relative"
            >
                <img
                    className="w-8 h-8 object-cover rounded-full mx-auto"
                    src={`data:image/png;base64,${userImage}`}
                    alt="User avatar"
                />
                {numberOfPendingFriendRequests ? (
                    <div className="absolute top-5 left-5 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none"></div>
                ) : null}
            </div>
            <Tooltip
                id="navbar-user-options-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );

    /**
     * Render the button based on the loading state.
     *
     * @type {JSX.Element}
     */
    return !userImage ? LoadingContent : NavbarUserOptionsButton;
}
