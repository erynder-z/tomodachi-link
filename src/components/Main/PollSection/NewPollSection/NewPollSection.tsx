import NewPollInput from '../../Poll/NewPollInput/NewPollInput';
import { motion } from 'framer-motion';

/**
 * Functional component for rendering the section to create a new poll.
 *
 * @component
 * @return {JSX.Element} The rendered NewPollSection component.
 */
export default function NewPollSection(): JSX.Element {
    /**
     * The rendered NewPollSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky top-0 mb-4  px-4 w-fit rounded-full bg-gray-300/80 dark:bg-gray-500/80">
                Create new poll
            </h1>
            <NewPollInput />
            <div className="mt-4 text-sm">
                Create multiple-choice polls to get feedback from other users!
            </div>
        </motion.div>
    );
}
