import { useState } from 'react';
import { CreatedPollDataType } from '../../../../../types/pollTypes';

type PollDescriptionTextAreaProps = {
    pollData: CreatedPollDataType;
    setPollData: React.Dispatch<React.SetStateAction<CreatedPollDataType>>;
};

/**
 * PollDescriptionTextArea component for entering a poll description.
 *
 * @component
 * @param {PollDescriptionTextAreaProps} props - The props object.
 * @param {CreatedPollDataType} props.pollData - The poll data.
 * @param {React.Dispatch<React.SetStateAction<CreatedPollDataType>>} props.setPollData - The function to update poll data state.
 * @returns {JSX.Element} The rendered PollDescriptionTextArea component.
 */
export default function PollDescriptionTextArea({
    pollData,
    setPollData,
}: PollDescriptionTextAreaProps): JSX.Element {
    const { description } = pollData;

    const [textareaRows, setTextareaRows] = useState(1);

    /**
     * Automatically resizes the textarea based on its content.
     *
     * @function
     * @param {HTMLTextAreaElement} textarea - The textarea element.
     * @returns {void} No return value.
     */
    const autoResizeTextarea = (textarea: HTMLTextAreaElement): void => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaRows(textarea.rows);
    };

    /**
     * Handles the change event when the description textarea value is updated.
     *
     * @function
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
     * @returns {void} No return value.
     */
    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            description: event.target.value,
        }));

        autoResizeTextarea(event.target);
    };

    /**
     * The rendered PollDescriptionTextArea component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="relative z-0">
            <textarea
                rows={textareaRows}
                autoComplete="off"
                id="newPost"
                name="newPost"
                className="block py-2.5 px-2 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer overflow-hidden resize-none"
                placeholder=" "
                value={description}
                onChange={handleDescriptionChange}
            />
            <label
                htmlFor="newPost"
                className="absolute text-sm px-2 text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                Further description
            </label>
            <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden"></div>
        </div>
    );
}
