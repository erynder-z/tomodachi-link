import { motion } from 'framer-motion';

/**
 * React component for rendering a spyglass icon animation.
 *
 * @component
 * @returns {JSX.Element} The rendered SpyGlassIcon component.
 */
export default function SpyGlassIcon(): JSX.Element {
    /**
     * Render the SpyGlassIcon component.
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
            <span className="text-6xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                🔍
            </span>
        </motion.div>
    );
}
