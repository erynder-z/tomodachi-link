import { motion } from 'framer-motion';

type ClearButtonProps = {
    clearSearch: () => void;
};

export default function ClearButton({ clearSearch }: ClearButtonProps) {
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
