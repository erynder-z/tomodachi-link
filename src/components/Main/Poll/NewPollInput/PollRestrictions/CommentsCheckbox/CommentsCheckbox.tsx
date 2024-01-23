import { CreatedPollDataType } from '../../../../../../types/pollTypes';

type PollRestrictionsProps = {
    pollData: CreatedPollDataType;
    setPollData: React.Dispatch<React.SetStateAction<CreatedPollDataType>>;
};

/**
 * CommentsCheckbox component for toggling the option to allow comments on the poll.
 *
 * @component
 * @param {PollRestrictionsProps} props - The props object.
 * @param {CreatedPollDataType} props.pollData - The poll data.
 * @param {React.Dispatch<React.SetStateAction<CreatedPollDataType>>} props.setPollData - The function to set the poll data.
 * @returns {JSX.Element} The rendered CommentsCheckbox component.
 */
export default function CommentsCheckbox({
    pollData,
    setPollData,
}: PollRestrictionsProps): JSX.Element {
    const { allowComments } = pollData;

    /**
     * Handles the change event of the checkbox to toggle the "allowComments" option in the poll data.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     * @returns {void}
     */
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            allowComments: event.target.checked,
        }));
    };

    /**
     * The rendered CommentsCheckbox component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="relative z-0">
            <label
                htmlFor="commentsCheckbox"
                className="flex items-center space-x-2 text-sm text-regularText dark:text-regularTextDark"
            >
                <input
                    type="checkbox"
                    id="commentsCheckbox"
                    name="commentsCheckbox"
                    className="peer sr-only"
                    checked={allowComments}
                    onChange={handleCheckboxChange}
                />
                <div
                    className={`${
                        allowComments
                            ? 'bg-highlight dark:bg-highlightDark'
                            : 'bg-background2 dark:bg-background2Dark'
                    } border border-gray-300 dark:border-gray-600 rounded-md w-5 h-5 flex items-center justify-center`}
                >
                    {allowComments && (
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
                <span>Allow comments</span>
            </label>
        </div>
    );
}
