import React from 'react';
import { RetrievedPollDataType } from '../../../../../types/retrievedPollDataType';
import useAuth from '../../../../../hooks/useAuth';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import useInfoCard from '../../../../../hooks/useInfoCard';

type PollAnswerSectionProps = {
    pollData: RetrievedPollDataType;
    canAnswerPost: boolean;
    handleRefreshPollData: () => Promise<void>;
};

export default function PollAnswerSection({
    pollData,
    canAnswerPost,
    handleRefreshPollData,
}: PollAnswerSectionProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { options } = pollData;

    const handleButtonClick = async (pollID: string, optionID: string) => {
        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${serverURL}/api/v1/poll/${pollID}/answer`,
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

            setInfo({
                typeOfInfo: 'good',
                message: 'Answer submitted!',
                icon: '😎',
            });
            handleRefreshPollData();
        } catch (err: unknown) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Unable to submit answer!',
                icon: '👻',
            });
        }
    };

    const OptionButton = (option: {
        _id: string;
        nameOfOption: string;
        selectionCount: number;
    }) => {
        const { _id, nameOfOption } = option;
        const pollID = pollData._id;
        const optionID = _id;

        return (
            <button
                key={optionID}
                disabled={!canAnswerPost}
                onClick={() => {
                    handleButtonClick(pollID, optionID);
                }}
                className={`${
                    canAnswerPost
                        ? 'p-2 w-12 min-w-max text-base bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularText dark:text-regularTextDark'
                        : 'p-2 w-12 min-w-max text-base bg-gray-500'
                }`}
            >
                {nameOfOption}
            </button>
        );
    };

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
