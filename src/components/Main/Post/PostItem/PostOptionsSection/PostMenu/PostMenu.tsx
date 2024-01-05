import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

type PostMenuProps = {
    handleEditButtonClick: () => void;
    handleDeleteButtonClick: () => void;
    shouldMenuShow: boolean;
};

export default function PostMenu({
    handleEditButtonClick,
    handleDeleteButtonClick,
    shouldMenuShow,
}: PostMenuProps) {
    const EditButton = (
        <button
            onClick={handleEditButtonClick}
            className="flex justify-around items-center h-full w-full p-2 rounded-t  hover:bg-buttonHover dark:hover:bg-buttonDarkHover duration-300"
        >
            <MdEdit size="1.25em" />
        </button>
    );

    const DeleteButton = (
        <button
            onClick={handleDeleteButtonClick}
            className="flex justify-around items-center h-full w-full p-2 rounded-t  hover:bg-buttonHover dark:hover:bg-buttonDarkHover duration-300"
        >
            <MdOutlineDeleteForever size="1.25em" />
        </button>
    );

    return (
        <AnimatePresence>
            {shouldMenuShow && (
                <motion.div
                    key="postMenu"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-12 right-0 z-10 bg-button dark:bg-buttonDark text-regularTextDark shadow-lg rounded"
                >
                    <ul className="flex flex-col list-none m-0 p-0">
                        <li className="m-0">{EditButton}</li>
                        <li className="m-0">{DeleteButton}</li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
