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
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

type PollItemProps = {
    pollData: RetrievedPollDataType;
};

/**
 * PollItem component for displaying a poll's details, including user information,
 * question, answer options, charts, and comments.
 *
 * @component
 * @param {PollItemProps} props - The props object.
 * @param {RetrievedPollDataType} props.pollData - The poll data.
 * @returns {JSX.Element} The rendered PollItem component.
 */
export default function PollItem({ pollData }: PollItemProps): JSX.Element {
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
    const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
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

    /**
     * Checks the answer status for the current user.
     *
     * @async
     * @function
     * @return {Promise<void>} A promise that resolves once the answer status is checked.
     */
    const checkAnswerStatus = async (): Promise<void> => {
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

    /**
     * Handles the refresh of poll data, including fetching updated details.
     *
     * @async
     * @function
     * @return {Promise<void>} A promise that resolves once poll data is refreshed.
     */
    const handleRefreshPollData = async (): Promise<void> => {
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
            displayErrorInfo(setInfo, 'Unable to fetch poll data!', '👻');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Effect hook to check if the user can answer the poll on mount.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldInitialize.current) checkAnswerStatus();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * Represents the data for the PieChart component.
     *
     * @property {Array<{ nameOfOption: string, selectionCount: number }>} data - The array of data for the PieChart.
     */
    const pieChartData = {
        data: pollOptionsData.map(({ nameOfOption, selectionCount }) => ({
            nameOfOption,
            selectionCount,
        })),
    };

    /**
     * Represents the data for the BarChart component.
     *

     * @property {Array<{ nameOfOption: string, selectionCount: number }>} data - The array of data for the BarChart.
     */
    const barChartData = {
        data: pollOptionsData.map(({ nameOfOption, selectionCount }) => ({
            nameOfOption,
            selectionCount,
        })),
    };

    /**
     * Calculates the total votes from the poll options data.
     *
     * @type {number}
     */
    const totalVotes: number = pollOptionsData.reduce(
        (total, option) => total + option.selectionCount,
        0
    );

    /**
     * Content for the loading state.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col gap-4 h-[400px] md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner message="Updating poll data" />
        </div>
    );

    /**
     * Represents the content for the chart display in the PollItem component.
     *
     * @type {JSX.Element}
     */
    const ChartContent: JSX.Element = loading ? (
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

    /**
     * Represents the content when the poll has no data.
     *
     * @type {JSX.Element}
     */
    const HasNoPollContent: JSX.Element = loading ? (
        LoadingContent
    ) : (
        <p>No poll data available ☹️</p>
    );

    /**
     * The rendered PollItem component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 p-4 w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg "
        >
            <div className="flex justify-between">
                <div className="w-2/3 md:w-1/2 flex items-center">
                    <PollUserInfoSection
                        pollOwnerID={ownerID}
                        userPic={userPic}
                        displayName={displayName}
                    />
                </div>
                <div className="w-1/3 md:w-1/2 flex justify-end items-center">
                    <PollDateSection date={date} />
                </div>
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
