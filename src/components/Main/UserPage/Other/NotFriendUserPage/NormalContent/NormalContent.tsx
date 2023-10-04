import { useState } from 'react';
import useAuth from '../../../../../../hooks/useAuth';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { OtherUserPageDataTypes } from '../../../../../../types/otherUserTypes';
import { motion } from 'framer-motion';
import { handleFriendRequest } from '../../../../../../utilities/handleFriendRequests';

type NormalContentProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

export default function NormalContent({
    userPageData,
    isFriendRequestPending,
}: NormalContentProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [disableButton, setDisableButton] = useState<boolean>(
        isFriendRequestPending.outgoing
    );
    const { firstName, lastName } = userPageData || {};
    const otherUserId = userPageData._id;

    const getButton = () => {
        if (disableButton) {
            return (
                <button disabled className="bg-gray-500 text-white px-2 py-1">
                    Friend request pending
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => {
                        if (token) {
                            const typeOfRequest = 'send';
                            setDisableButton(true);
                            handleFriendRequest(
                                token,
                                otherUserId,
                                setInfo,
                                typeOfRequest
                            );
                        }
                    }}
                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600"
                >
                    Send friend request
                </button>
            );
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center gap-4 p-4"
        >
            <h2 className="font-bold">
                Become friends with {firstName} {lastName} to view more!
            </h2>
            {getButton()}
        </motion.div>
    );
}
