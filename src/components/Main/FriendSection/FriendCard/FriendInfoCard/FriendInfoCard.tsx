import { ImageType } from '../../../../../types/miscTypes';
import { motion } from 'framer-motion';

type FriendInfoCardProps = {
    userpic: ImageType;
    firstName: string;
    lastName: string;
};

export default function FriendInfoCard({
    userpic,
    firstName,
    lastName,
}: FriendInfoCardProps) {
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
