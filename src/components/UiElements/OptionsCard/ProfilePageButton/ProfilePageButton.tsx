import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import Badge from '../Badge/Badge';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

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
        <>
            <motion.div
                data-tooltip-id="options-own-page-tooltip"
                data-tooltip-content="View your profile page"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                whileTap={{ scale: 0.97 }}
            >
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
            </motion.div>
            <Tooltip
                id="options-own-page-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
