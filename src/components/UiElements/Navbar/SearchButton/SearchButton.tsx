import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';

type SearchButtonProps = {
    handleSearchButtonClick: () => void;
};

export default function SearchButton({
    handleSearchButtonClick,
}: SearchButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleSearchButtonClick}
            className="flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-full w-full"
        >
            <MdSearch size="1.5em" />
        </motion.button>
    );
}
