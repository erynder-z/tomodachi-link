import { MdKey } from 'react-icons/md';
import { motion } from 'framer-motion';

type UpdatePasswordButtonProps = {
    setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * React component for the "Change Password" button.
 *
 * @component
 * @param {UpdatePasswordButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered UpdatePasswordButton component.
 */
export default function UpdatePasswordButton({
    setCurrentMenu,
}: UpdatePasswordButtonProps): JSX.Element {
    /**
     * Handles the click event on the "Change Password" button.
     *
     * @function
     * @returns {void}
     */
    const handleUpdatePasswordButtonClick = (): void => {
        setCurrentMenu('changePassword');
    };

    /**
     * The rendered UpdatePasswordButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex w-full">
            <motion.button
                onClick={handleUpdatePasswordButtonClick}
                whileTap={{ scale: 0.97 }}
                className="flex justify-center items-center gap-4 w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-regularTextDark px-2 py-1 rounded"
            >
                <MdKey size="1.5em" /> Change Password
            </motion.button>
        </div>
    );
}
