import React from 'react';
import { PollDataType } from '../../../../../../types/pollDataType';

type PollRestrictionsProps = {
    pollData: PollDataType;
    setPollData: React.Dispatch<React.SetStateAction<PollDataType>>;
};

export default function FriendsOnlyCheckbox({
    pollData,
    setPollData,
}: PollRestrictionsProps) {
    const { isFriendOnly } = pollData;

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPollData((prevData: PollDataType) => ({
            ...prevData,
            isFriendOnly: event.target.checked,
        }));
    };

    return (
        <div className="relative z-0">
            <label
                htmlFor="friendOnlyCheckbox"
                className="flex items-center space-x-2 text-sm text-regularText dark:text-regularTextDark"
            >
                <input
                    type="checkbox"
                    id="friendOnlyCheckbox"
                    name="friendOnlyCheckbox"
                    className="peer sr-only"
                    checked={isFriendOnly}
                    onChange={handleCheckboxChange}
                />
                <div
                    className={`${
                        isFriendOnly
                            ? 'bg-highlight dark:bg-highlightDark'
                            : 'bg-background2 dark:bg-background2Dark'
                    } border border-gray-300 dark:border-gray-600 rounded-md w-5 h-5 flex items-center justify-center`}
                >
                    {isFriendOnly && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 text-regularText dark:text-regularTextDark"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
                <span>Friend-Only Poll</span>
            </label>
        </div>
    );
}
