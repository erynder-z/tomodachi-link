import { motion } from 'framer-motion';

/**
 * React component for rendering a message when no search results are found.
 *
 * @component
 * @returns {JSX.Element} The rendered NoResultsFound component.
 */
export default function NoResultsFound(): JSX.Element {
    /**
     * Render the NoResultsFound component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center"
        >
            <span className="text-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-regularTextDark">
                🌵 No results found
            </span>
        </motion.div>
    );
}
