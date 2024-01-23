import { CreatedPollDataType } from '../../../../../types/pollTypes';

type PollQuestionInputProps = {
    pollData: CreatedPollDataType;
    handleQuestionInputChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

/**
 * PollQuestionInput component for entering the poll question.
 *
 * @component
 * @param {PollQuestionInputProps} props - The props object.
 * @param {CreatedPollDataType} props.pollData - The poll data.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.handleQuestionInputChange - The function to handle changes in the poll question input.
 * @returns {JSX.Element} The rendered PollQuestionInput component.
 */
export default function PollQuestionInput({
    pollData,
    handleQuestionInputChange,
}: PollQuestionInputProps): JSX.Element {
    const { question } = pollData;

    /**
     * The rendered PollQuestionInput component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="newPollQuestion"
                name="newPollQuestion"
                className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer overflow-hidden resize-none"
                placeholder=" "
                value={question}
                onChange={handleQuestionInputChange}
            />

            <label
                htmlFor="newPollQuestion"
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                Question
            </label>
            <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden"></div>
        </div>
    );
}
