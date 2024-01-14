import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshPollButton.css';
import { Tooltip } from 'react-tooltip';

type RefreshPollButtonProps = {
    refreshPoll: () => Promise<void>;
};

export default function RefreshPollButton({
    refreshPoll,
}: RefreshPollButtonProps) {
    return (
        <>
            <motion.button
                data-tooltip-id="poll-refresh-tooltip"
                data-tooltip-content="Refresh poll list"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={refreshPoll}
                whileTap={{ scale: 0.97 }}
                className="refresh-button"
            >
                <MdSync className="spin-on-hover" />
            </motion.button>
            <Tooltip
                id="poll-refresh-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
