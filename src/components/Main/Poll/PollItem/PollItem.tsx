import React, { useEffect, useRef, useState } from 'react';
import { RetrievedPollDataType } from '../../../../types/retrievedPollDataType';
import { motion } from 'framer-motion';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';
import format from 'date-fns/format';
import PollUserInfoSection from './PollUserInfoSection/PollUserInfoSection';
import PollDateSection from './PollDateSection/PollDateSection';
import { PieChart } from '../PieChart/PieChart';
import PollAnswerSection from './PollAnswerSection/PollAnswerSection';
import PollQuestionSection from './PollQuestionSection/PollQuestionSection';
import useAuth from '../../../../hooks/useAuth';
import PollDescriptionSection from './PollDescriptionSection/PollDescriptionSection';
import FriendOnlyInfoSection from './FriendOnlyInfoSection/FriendOnlyInfoSection';

type PollItemProps = {
    pollData: RetrievedPollDataType;
};

export default function PollItem({ pollData }: PollItemProps) {
    const { token } = useAuth();
    const [canAnswerPost, setCanAnswerPost] = useState<boolean>(false);
    const { userpic, firstName, lastName } = pollData.owner;
    const { _id, timestamp, options, isFriendOnly } = pollData;
    const displayName = `${firstName} ${lastName} `;
    const userPic = convertDatabaseImageToBase64(userpic);
    const date = timestamp ? format(new Date(timestamp), 'MMMM dd, yyyy') : '';
    const hasPollData = options.every((option) => option.selectionCount === 0);
    const hasDescription = pollData.description;

    const shouldInitialize = useRef(true);

    const checkAnswerStatus = async () => {
        try {
            const pollID = _id;
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${serverURL}/api/v1/poll/${pollID}/check`,
                {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            setCanAnswerPost(data.canAnswer);
        } catch (err: unknown) {
            console.error('Could not verify answers');
        }
    };

    useEffect(() => {
        if (shouldInitialize.current) checkAnswerStatus();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const pieChartData = {
        width: 640,
        height: 400,
        data: options.map(({ nameOfOption, selectionCount }) => ({
            nameOfOption,
            selectionCount,
        })),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg"
        >
            <div className="flex justify-between">
                <PollUserInfoSection
                    userPic={userPic}
                    displayName={displayName}
                />
                <PollDateSection date={date} />
            </div>
            <PollQuestionSection pollData={pollData} />
            {hasDescription && <PollDescriptionSection pollData={pollData} />}
            <PollAnswerSection
                pollData={pollData}
                canAnswerPost={canAnswerPost}
            />
            {hasPollData ? (
                <p>No poll data available ☹️</p>
            ) : (
                <PieChart
                    width={pieChartData.width}
                    height={pieChartData.height}
                    data={pieChartData.data}
                />
            )}
            {isFriendOnly && (
                <FriendOnlyInfoSection displayName={displayName} />
            )}
        </motion.div>
    );
}
