import { ImageType } from '../../../../../types/miscTypes';
import { motion } from 'framer-motion';
import defaultUserpic from '../../../../../assets/defaultUserpic.png';

type SuggestionCardRandomInfoProps = {
    userpic: ImageType;
    firstName: string;
    lastName: string;
};

/**
 * SuggestionCardRandomInfo component for displaying information about a random user in the suggestion card.
 *
 * @component
 * @param {SuggestionCardRandomInfoProps} props - The props object.
 * @param {ImageType} props.userpic - The user's profile picture.
 * @param {string} props.firstName - The user's first name.
 * @param {string} props.lastName - The user's last name.
 * @return {JSX.Element} The rendered SuggestionCardRandomInfo component.
 */
export default function SuggestionCardRandomInfo({
    userpic,
    firstName,
    lastName,
}: SuggestionCardRandomInfoProps): JSX.Element {
    // Use the default userpic if no userpic is provided. (This should only apply to fake users created with faker.js)
    const userpicSrc = userpic?.data
        ? `data:image/png;base64,${userpic.data}`
        : defaultUserpic;

    /**
     * JSX element representing the SuggestionCardRandomInfo component.
     *
     * @type {JSX.Element}
     */
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
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark truncate">
                {firstName} {lastName}
            </p>
        </motion.div>
    );
}
