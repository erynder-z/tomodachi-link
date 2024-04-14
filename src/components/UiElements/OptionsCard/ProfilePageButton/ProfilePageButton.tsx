import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import Badge from '../Badge/Badge';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../hooks/useTheme';

type ProfilePageButtonProps = {
    resetOverlays: () => void;
};

/**
 * React component for rendering a button that links to the user's profile page.
 *
 * @function
 * @param {ProfilePageButtonProps} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setShouldOverlaysShow - React state dispatch function to update overlay visibility.
 * @returns {JSX.Element} The rendered ProfilePageButton component.
 */
export default function ProfilePageButton({
    resetOverlays,
}: ProfilePageButtonProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { isMobileDevice } = useTheme();
    const { pendingFriendRequests } = currentUserData || {};
    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    /**
     * Closes all overlay options when the profile page button is clicked.
     *
     * @function
     * @returns {void}
     */
    const handleCloseOptions = (): void => {
        resetOverlays();
    };

    /**
     * Rendered JSX for the ProfilePageButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.div
                data-tooltip-id="options-own-page-tooltip"
                data-tooltip-content="View your profile page"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
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
