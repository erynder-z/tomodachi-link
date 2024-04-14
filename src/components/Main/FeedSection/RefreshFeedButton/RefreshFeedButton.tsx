import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshFeedButton.css';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../hooks/useTheme';

type RefreshFeedButtonProps = {
    refreshFeed: () => Promise<void>;
};

/**
 * RefreshFeedButton component to provide a button for refreshing the feed.
 *
 * @component
 * @param {RefreshFeedButtonProps} props - The props object.
 * @param {() => Promise<void>} props.refreshFeed - Function to handle feed refresh.
 * @returns {JSX.Element} The rendered RefreshFeedButton component.
 */
export default function RefreshFeedButton({
    refreshFeed,
}: RefreshFeedButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    /**
     * The main RefreshFeedButton component.
     *
     * @returns {JSX.Element} The rendered RefreshFeedButton component.
     */
    return (
        <>
            <motion.button
                data-tooltip-id="feed-refresh-tooltip"
                data-tooltip-content="Refresh feed"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                onClick={refreshFeed}
                whileTap={{ scale: 0.97 }}
                className="refresh-button"
            >
                <MdSync className="spin-on-hover" />
            </motion.button>
            <Tooltip
                id="feed-refresh-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
