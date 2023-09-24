import React from 'react';
import { RetrievedPollDataType } from '../../../../types/retrievedPollDataType';
import { motion } from 'framer-motion';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';
import format from 'date-fns/format';
import PollUserInfoSection from './PollUserInfoSection/PollUserInfoSection';
import PollDateSection from './PollDateSection/PollDateSection';
import { PieChart } from '../PieChart/PieChart';

type PollItemProps = {
    pollData: RetrievedPollDataType;
};

export default function PollItem({ pollData }: PollItemProps) {
    const { userpic, firstName, lastName } = pollData.owner;
    const { timestamp, options } = pollData;
    const displayName = `${firstName} ${lastName} `;
    const userPic = convertDatabaseImageToBase64(userpic);
    const date = timestamp ? format(new Date(timestamp), 'MMMM dd, yyyy') : '';
    const hasPollData = options.every((option) => option.selectionCount === 0);

    const pieChartData = {
        width: 700,
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

            {hasPollData ? (
                <p>No poll data available ☹️</p>
            ) : (
                <PieChart
                    width={pieChartData.width}
                    height={pieChartData.height}
                    data={pieChartData.data}
                />
            )}
        </motion.div>
    );
}
