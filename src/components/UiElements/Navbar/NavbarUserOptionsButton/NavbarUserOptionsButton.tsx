import { Tooltip } from 'react-tooltip';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

export default function NavbarUserOptionsButton() {
    const { currentUserData } = useCurrentUserData();
    const { userpic, pendingFriendRequests } = currentUserData || {};
    const userImage = userpic ? userpic.data : undefined;

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    const LoadingContent = (
        <div className="w-8 h-8 object-cover rounded-full mx-auto bg-gray-600/50 animate-pulse"></div>
    );

    const NavbarUserOptionsButton = (
        <>
            <div
                data-tooltip-id="navbar-user-options-tooltip"
                data-tooltip-content="View options"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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

    return !userImage ? LoadingContent : NavbarUserOptionsButton;
}
