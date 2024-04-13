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
            <span className="text-6xl mt-24">🔍</span>
        </motion.div>
    );
}
