import { TbLink } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type SuggestionCardRandomMenuProps = {
    id: string;
};

/**
 * SuggestionCardRandomMenu component for displaying menu options related to a random user in the suggestion card.
 *
 * @component
 * @param {SuggestionCardRandomMenuProps} props - The properties of the component.
 * @param {string} props.id - The ID of the user.
 * @return {JSX.Element} The rendered SuggestionCardRandomMenu component.
 */
export default function SuggestionCardRandomMenu({
    id,
}: SuggestionCardRandomMenuProps) {
    /**
     * The rendered SuggestionCardRandomMenu component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col gap-2 justify-around items-center"
        >
            <Link
                to={`/users/${id}`}
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Visit page
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbLink />
                </div>
            </Link>
        </motion.div>
    );
}
