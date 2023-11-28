import { ImageType } from '../../../../../types/miscTypes';
import { motion } from 'framer-motion';
import defaultUserpic from '../../../../../assets/defaultUserpic.png';

type SuggestionCardRandomInfoProps = {
    userpic: ImageType;
    firstName: string;
    lastName: string;
};

export default function SuggestionCardRandomInfo({
    userpic,
    firstName,
    lastName,
}: SuggestionCardRandomInfoProps) {
    // Use the default userpic if no userpic is provided. (This should only apply to fake users created with faker.js)
    const userpicSrc = userpic?.data
        ? `data:image/png;base64,${userpic.data}`
        : defaultUserpic;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
        >
            <img
                className="w-20 h-20 object-cover mx-auto rounded-full border-4 border-regularText dark:border-regularTextDark"
                src={userpicSrc}
                alt="User avatar"
            />
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark">
                {firstName} {lastName}
            </p>
        </motion.div>
    );
}
