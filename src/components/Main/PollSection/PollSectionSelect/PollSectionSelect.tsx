import { motion } from 'framer-motion';
import { MdAddChart, MdInsights } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function PollSectionSelect() {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-4 min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky z-50 top-0 md:top-4 md:mb-4 py-1 px-4 w-full md:w-fit md:rounded-full bg-background2 dark:bg-background2Dark md:bg-gray-300/80 md:dark:bg-gray-500/80">
                Polls
            </h1>

            <div className="flex flex-col w-5/6 md:w-full bg-card dark:bg-cardDark rounded md:shadow-md">
                <Link
                    to="/polls/new"
                    className="h-20 flex justify-center items-center gap-4 p-4 text-regularText dark:text-regularTextDark hover:bg-highlight dark:hover:bg-highlightDark rounded-t duration-300"
                >
                    <MdAddChart size="2em" />
                    Create new poll
                </Link>
                <Link
                    to="/polls/list"
                    className="h-20 flex justify-center items-center gap-4 p-4 text-regularText dark:text-regularTextDark hover:bg-highlight dark:hover:bg-highlightDark rounded-t duration-300"
                >
                    <MdInsights size="2em" /> View polls
                </Link>
            </div>
        </motion.div>
    );
}
