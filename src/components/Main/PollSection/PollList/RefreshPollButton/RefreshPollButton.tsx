import { MdSync } from 'react-icons/md';
import { motion } from 'framer-motion';
import './RefreshPollButton.css';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type RefreshPollButtonProps = {
    refreshPoll: () => Promise<void>;
};

/**
 * Button to refresh the poll list.
 *
 * @component
 * @param {RefreshPollButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered React element.
 */
export default function RefreshPollButton({
    refreshPoll,
}: RefreshPollButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    /**
     * The rendered RefreshPollButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="poll-refresh-tooltip"
                data-tooltip-content="Refresh poll list"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
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
