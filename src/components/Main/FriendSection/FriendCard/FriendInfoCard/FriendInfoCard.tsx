import { ImageType } from '../../../../../types/miscTypes';
import { motion } from 'framer-motion';

type FriendInfoCardProps = {
    userpic: ImageType;
    firstName: string;
    lastName: string;
};

/**
 * FriendInfoCard component to display information about a friend.
 *
 * @component
 * @param {FriendInfoCardProps} props - The props object.
 * @param {ImageType} props.userpic - The user's profile picture.
 * @param {string} props.firstName - The first name of the friend.
 * @param {string} props.lastName - The last name of the friend.
 * @return {JSX.Element} The rendered FriendInfoCard component.
 */
export default function FriendInfoCard({
    userpic,
    firstName,
    lastName,
}: FriendInfoCardProps) {
    /**
     * JSX element representing the friend information card.
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
                src={`data:image/png;base64,${userpic?.data}`}
                alt="User avatar"
            />
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark">
                {firstName} {lastName}
            </p>
        </motion.div>
    );
}
