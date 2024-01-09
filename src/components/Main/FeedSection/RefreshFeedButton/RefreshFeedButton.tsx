import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshFeedButton.css';
import { Tooltip } from 'react-tooltip';

type RefreshFeedButtonProps = {
    refreshFeed: () => Promise<void>;
};

export default function RefreshFeedButton({
    refreshFeed,
}: RefreshFeedButtonProps) {
    return (
        <>
            <motion.button
                data-tooltip-id="feed-refresh-tooltip"
                data-tooltip-content="Refresh feed"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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
