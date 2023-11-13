import { useEffect, useRef, useState } from 'react';
import {
    RetrievedPollDataType,
    PollDataItemType,
} from '../../../../types/pollTypes';
import { AnimatePresence, motion } from 'framer-motion';
import format from 'date-fns/format';
import PollUserInfoSection from './PollUserInfoSection/PollUserInfoSection';
import PollDateSection from './PollDateSection/PollDateSection';
import { PieChart } from '../PieChart/PieChart';
import PollAnswerSection from './PollAnswerSection/PollAnswerSection';
import PollQuestionSection from './PollQuestionSection/PollQuestionSection';
import useAuth from '../../../../hooks/useAuth';
import PollDescriptionSection from './PollDescriptionSection/PollDescriptionSection';
import FriendOnlyInfoSection from './FriendOnlyInfoSection/FriendOnlyInfoSection';
import useInfoCard from '../../../../hooks/useInfoCard';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import PollCommentSection from './PollCommentSection/PollCommentSection';
import { CommentType } from '../../../../types/commentTypes';
import TypeOfChartSwitcher from './TypeOfChartSwitcher/TypeOfChartSwitcher';
import { BarChart } from '../BarChart/BarChart';
import { useDimensions } from '../../../../hooks/useDimensions';
import TotalVotesCounter from './TotalVotesCounter/TotalVotesCounter';
import { InfoType } from '../../../../types/infoTypes';

type PollItemProps = {
    pollData: RetrievedPollDataType;
};

export default function PollItem({ pollData }: PollItemProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [canAnswerPost, setCanAnswerPost] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [pollOptionsData, setPollOptionsData] = useState<PollDataItemType[]>(
        pollData.options
    );
    const [pollComments, setPollComments] = useState<CommentType[]>(
        pollData.comments || []
    );
    const [typeOfChart, setTypeOfChart] = useState<'PIE' | 'BAR'>('PIE');
    const { userpic, firstName, lastName } = pollData.owner;
    const { createdAt, isFriendOnly, allowComments } = pollData;
    const displayName = `${firstName} ${lastName} `;
    const userPic = userpic.data;
    const date = createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : '';
    const hasNoPollData = pollOptionsData.every(
        (option) => option.selectionCount === 0
    );
    const hasDescription = pollData.description;

    const ownerID = pollData.owner._id;
    const pollID = pollData._id;

    const wrapperDivRef = useRef<HTMLDivElement | null>(null);
    // Get the dimensions of the wrapper div.
    const dimensions = useDimensions(wrapperDivRef);

    const shouldInitialize = useRef(true);

    const checkAnswerStatus = async () => {
        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${SERVER_URL}/api/v1/poll/${pollID}/check`,
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

    const handleRefreshPollData = async () => {
        setLoading(true);
        checkAnswerStatus();
        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${SERVER_URL}/api/v1/poll/${pollID}/details`,
                {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();

                setPollOptionsData(data.retrievedPoll.options);
                setPollComments(data.retrievedPoll.comments);
            } else {
                handleFetchErrors(response, setInfo);
            }
        } catch (err: unknown) {
            const ERROR_INFO = {
                typeOfInfo: 'bad',
                message: 'Unable to fetch poll data!',
                icon: '👻',
            };

            setInfo(ERROR_INFO as InfoType);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldInitialize.current) checkAnswerStatus();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const pieChartData = {
        data: pollOptionsData.map(({ nameOfOption, selectionCount }) => ({
            nameOfOption,
            selectionCount,
        })),
    };

    const barChartData = {
        data: pollOptionsData.map(({ nameOfOption, selectionCount }) => ({
            nameOfOption,
            selectionCount,
        })),
    };

    const totalVotes = pollOptionsData.reduce(
        (total, option) => total + option.selectionCount,
        0
    );

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-[400px] md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner message="Updating poll data" />
        </div>
    );

    const ChartContent = loading ? (
        LoadingContent
    ) : (
        <AnimatePresence mode="wait">
            <motion.div
                key={typeOfChart}
                ref={wrapperDivRef}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {typeOfChart === 'PIE' ? (
                    <PieChart
                        dimensions={dimensions}
                        data={pieChartData.data}
                    />
                ) : (
                    <BarChart
                        dimensions={dimensions}
                        data={barChartData.data}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );

    const HasNoPollContent = loading ? (
        LoadingContent
    ) : (
        <p>No poll data available ☹️</p>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 p-4 w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg"
        >
            <div className="flex justify-between">
                <PollUserInfoSection
                    pollOwnerID={ownerID}
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
                handleRefreshPollData={handleRefreshPollData}
            />
            {hasNoPollData ? HasNoPollContent : ChartContent}
            {!hasNoPollData && <TotalVotesCounter totalVotes={totalVotes} />}
            {isFriendOnly && (
                <FriendOnlyInfoSection displayName={displayName} />
            )}
            {!hasNoPollData && (
                <TypeOfChartSwitcher
                    typeOfChart={typeOfChart}
                    setTypeOfChart={setTypeOfChart}
                />
            )}

            <PollCommentSection
                areCommentsAllowed={allowComments}
                comments={pollComments}
                parentItemID={pollID}
                handleRefreshPollData={handleRefreshPollData}
            />
        </motion.div>
    );
}
