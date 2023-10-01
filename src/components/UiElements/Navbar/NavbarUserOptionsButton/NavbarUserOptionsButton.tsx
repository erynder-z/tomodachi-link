import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';

export default function NavbarUserOptionsButton() {
    const { currentUserData } = useCurrentUserData();
    const { userpic, pendingFriendRequests } = currentUserData || {};
    const userImage = userpic
        ? convertDatabaseImageToBase64(userpic)
        : undefined;

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    const LoadingContent = (
        <div className="w-8 h-8 object-cover rounded-full mx-auto bg-gray-600/50 animate-pulse"></div>
    );

    const NavbarUserOptionsButton = (
        <div className="relative">
            <img
                className="w-8 h-8 object-cover rounded-full mx-auto"
                src={`data:image/png;base64,${userImage}`}
                alt="User avatar"
            />
            {numberOfPendingFriendRequests ? (
                <div className="absolute top-5 left-5 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none"></div>
            ) : null}
        </div>
    );

    return !userImage ? LoadingContent : NavbarUserOptionsButton;
}
