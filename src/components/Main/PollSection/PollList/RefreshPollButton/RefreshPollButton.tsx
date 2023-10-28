import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshPollButton.css';

type RefreshPollButtonProps = {
    refreshPoll: () => Promise<void>;
};

export default function RefreshPollButton({
    refreshPoll,
}: RefreshPollButtonProps) {
    return (
        <motion.button
            onClick={refreshPoll}
            whileTap={{ scale: 0.97 }}
            className="refresh-button"
        >
            <MdSync className="spin-on-hover" />
        </motion.button>
    );
}
