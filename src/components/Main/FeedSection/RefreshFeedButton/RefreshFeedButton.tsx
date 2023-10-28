import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshFeedButton.css';

type RefreshFeedButtonProps = {
    refreshFeed: () => Promise<void>;
};

export default function RefreshFeedButton({
    refreshFeed,
}: RefreshFeedButtonProps) {
    return (
        <motion.button
            onClick={refreshFeed}
            whileTap={{ scale: 0.97 }}
            className="refresh-button"
        >
            <MdSync className="spin-on-hover" />
        </motion.button>
    );
}
