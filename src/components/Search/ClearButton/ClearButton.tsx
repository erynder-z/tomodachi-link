import { motion } from 'framer-motion';

type ClearButtonProps = {
    clearSearch: () => void;
};

/**
 * React component for rendering a clear button in the search interface.
 *
 * @component
 * @param {ClearButtonProps} props - The component props.
 * @param {() => void} props.clearSearch - Callback function to clear the search.
 * @returns {JSX.Element} The rendered ClearButton component.
 */
export default function ClearButton({
    clearSearch,
}: ClearButtonProps): JSX.Element {
    /**
     * Render the search clear button.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="absolute -top-5 right-2 text-regularTextDark hover:text-highlight dark:hover:text-highlightDark text-xs"
            onClick={clearSearch}
        >
            Clear
        </motion.button>
    );
}
