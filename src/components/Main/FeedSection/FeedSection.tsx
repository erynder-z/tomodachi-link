import { useEffect, useRef, useState } from 'react';
import useFriendData from '../../../hooks/useFriendData';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { FriendDataType } from '../../../types/friendTypes';
import { motion } from 'framer-motion';

type FeedSectionProps = {
    isPaginationTriggered: boolean;
};

export default function FeedSection({
    isPaginationTriggered,
}: FeedSectionProps) {
    const { friendData } = useFriendData();
    const [friendList, setFriendList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldExtractFriendIds = useRef(true);

    const extractFriendIdFromFriendData = (friendData: FriendDataType[]) => {
        const idArray: string[] = [];
        friendData?.map((friend) => {
            idArray.push(friend._id);
        });

        return idArray;
    };

    useEffect(() => {
        if (friendData && shouldExtractFriendIds.current) {
            setFriendList(extractFriendIdFromFriendData(friendData));
            setLoading(false);
            return () => {
                shouldExtractFriendIds.current = false;
            };
        }
    }, [friendData]);

    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-card dark:bg-cardDark"
        >
            <LoadingSpinner />
        </motion.div>
    );

    const HomeContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col just min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="text-center text-xl font-bold mb-4">Your feed</h1>
            <Feed
                friendList={friendList}
                isPaginationTriggered={isPaginationTriggered}
            />
        </motion.div>
    );

    return loading ? LoadingContent : HomeContent;
}
