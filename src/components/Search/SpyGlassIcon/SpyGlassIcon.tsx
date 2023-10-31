import { motion } from 'framer-motion';
export default function SpyGlassIcon() {
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
