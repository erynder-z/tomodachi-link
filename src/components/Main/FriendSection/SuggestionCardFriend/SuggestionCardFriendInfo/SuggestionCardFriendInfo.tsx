import React from 'react';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import { motion } from 'framer-motion';
import { shuffleArray } from '../../../../../utilities/shuffleArray';
import { CommonFriendType } from '../../../../../types/friendsOfFriendsType';

type SuggestionCardFriendInfoProps = {
    userpic: {
        data: {
            data: Buffer;
        };
        contentType: string;
    };
    firstName: string;
    lastName: string;
    commonFriends: CommonFriendType[];
};

export default function SuggestionCardFriendInfo({
    userpic,
    firstName,
    lastName,
    commonFriends,
}: SuggestionCardFriendInfoProps) {
    const MAX_DISPLAY_ITEMS = 2;
    const shuffledCommonFriends = shuffleArray(commonFriends);
    const displayedCommonFriends = shuffledCommonFriends?.slice(
        0,
        MAX_DISPLAY_ITEMS
    );
    const additionalItemsCount =
        commonFriends && commonFriends.length > MAX_DISPLAY_ITEMS
            ? commonFriends.length - MAX_DISPLAY_ITEMS
            : 0;

    const commonFriendsList = displayedCommonFriends?.map(
        (commonFriendObject: CommonFriendType) => (
            <p key={commonFriendObject._id} className="text-xs break-all">
                {commonFriendObject.firstName} {commonFriendObject.lastName}
            </p>
        )
    );

    const FriendData = (
        <>
            <img
                className="w-20 h-20 object-cover mx-auto rounded-full border-4 border-regularText dark:border-regularTextDark"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark">
                {firstName} {lastName}
            </p>
        </>
    );

    const CommonFriendsContent = (
        <div className="flex flex-col">
            <h1 className="font-semibold text-xs leading-tight">
                {`Common friend${commonFriends.length > 1 ? 's' : ''}`}
            </h1>
            {commonFriendsList}
            {additionalItemsCount > 0 && (
                <p className="text-xs">{`and ${additionalItemsCount} more`}</p>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
        >
            {FriendData}
            {commonFriends && CommonFriendsContent}
        </motion.div>
    );
}
