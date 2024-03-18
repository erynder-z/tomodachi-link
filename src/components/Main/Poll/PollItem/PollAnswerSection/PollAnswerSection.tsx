import { RetrievedPollDataType } from '../../../../../types/pollTypes';
import useAuth from '../../../../../hooks/useAuth';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { motion } from 'framer-motion';
import { displaySuccessInfo } from '../../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../../UiElements/UserNotification/displayErrorInfo';
import { Tooltip } from 'react-tooltip';

type PollAnswerSectionProps = {
    pollData: RetrievedPollDataType;
    canAnswerPost: boolean;
    handleRefreshPollData: () => Promise<void>;
};

/**
 * React component for rendering a poll answer section.
 *
 * @component
 * @param {PollAnswerSectionProps} props - The props object.
 * @param {RetrievedPollDataType} props.pollData - The poll data to display.
 * @param {boolean} props.canAnswerPost - Indicates whether the user can answer the poll.
 * @param {Function} props.handleRefreshPollData - Callback function to refresh poll data.
 * @returns {JSX.Element} - Rendered PollAnswerSection component.
 */
export default function PollAnswerSection({
    pollData,
    canAnswerPost,
    handleRefreshPollData,
}: PollAnswerSectionProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { options } = pollData;

    /**
     * Handles button click to submit an answer to the poll.
     *
     * @async
     * @param {string} pollID - The ID of the poll.
     * @param {string} optionID - The ID of the selected option.
     * @returns {Promise<void>} - A promise that resolves after the answer submission.
     */
    const handleButtonClick = async (
        pollID: string,
        optionID: string
    ): Promise<void> => {
        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${SERVER_URL}/api/v1/poll/${pollID}/answer`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ optionID }),
                }
            );

            if (!response.ok) handleFetchErrors(response, setInfo);

            displaySuccessInfo(setInfo, 'Answer submitted!', '😎');
            handleRefreshPollData();
        } catch (err: unknown) {
            displayErrorInfo(setInfo, 'Unable to submit answer!', '👻');
        }
    };

    /**
     * Button component for a poll option.
     *
     * @param {Object} option - The poll option.
     * @param {string} option._id - The ID of the option.
     * @param {string} option.nameOfOption - The name of the option.
     * @param {number} option.selectionCount - The count of selections for the option.
     * @returns {JSX.Element} - Rendered OptionButton component.
     */
    const OptionButton = (option: {
        _id: string;
        nameOfOption: string;
        selectionCount: number;
    }): JSX.Element => {
        const { _id, nameOfOption } = option;
        const pollID = pollData._id;
        const optionID = _id;

        return (
            <div key={optionID}>
                <motion.button
                    data-tooltip-id="poll-answer-tooltip"
                    data-tooltip-content="Submit answer"
                    data-tooltip-variant="dark"
                    data-tooltip-delay-show={500}
                    disabled={!canAnswerPost}
                    onClick={() => {
                        handleButtonClick(pollID, optionID);
                    }}
                    whileTap={{ scale: 0.97 }}
                    className={`${
                        canAnswerPost
                            ? 'p-2 w-12 min-w-max text-base bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark dark:text-regularTextDark duration-300 rounded'
                            : 'p-2 w-12 min-w-max text-base bg-gray-500 rounded text-regularTextDark '
                    }`}
                >
                    {nameOfOption}
                </motion.button>
                {canAnswerPost && (
                    <Tooltip
                        id="poll-answer-tooltip"
                        style={{ fontSize: '0.75rem' }}
                    />
                )}
            </div>
        );
    };

    /**
     * The rendered PollAnswerSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col gap-4 text-xs">
            {canAnswerPost ? (
                <span>Choose an answer!</span>
            ) : (
                <span>You have already answered this poll!</span>
            )}
            <div className="flex flex-wrap gap-4">
                {options.map((option) => OptionButton(option))}
            </div>
        </div>
    );
}
