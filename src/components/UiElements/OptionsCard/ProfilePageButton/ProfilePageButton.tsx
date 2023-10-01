import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import Badge from '../Badge/Badge';

type ProfilePageButtonProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};

export default function ProfilePageButton({
    setShouldOverlaysShow,
}: ProfilePageButtonProps) {
    const { currentUserData } = useCurrentUserData();
    const { pendingFriendRequests } = currentUserData || {};
    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    const handleCloseOptions = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    return (
        <Link
            to={'/mypage'}
            onClick={handleCloseOptions}
            className="relative cursor-pointer hover:drop-shadow-lg text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            <TbUserCircle size="1.5em" />
            {numberOfPendingFriendRequests ? (
                <Badge numberToShow={numberOfPendingFriendRequests} />
            ) : null}
        </Link>
    );
}
