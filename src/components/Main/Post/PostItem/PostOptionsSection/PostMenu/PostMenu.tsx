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
            className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300"
        >
            <MdEdit size="1.25em" />
        </button>
    );

    const DeleteButton = (
        <button
            onClick={handleDeleteButtonClick}
            className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300"
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
                    className="absolute top-8 right-0 z-10 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark border-2 border-regularText dark:border-regularTextDark shadow-lg rounded lg:rounded-lg"
                >
                    <ul className="flex flex-col gap-4 ">
                        <li>{EditButton}</li>
                        <li>{DeleteButton}</li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
