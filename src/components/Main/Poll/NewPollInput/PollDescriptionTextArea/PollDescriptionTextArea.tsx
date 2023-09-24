import React, { useState } from 'react';
import { PollDataType } from '../../../../../types/createdPollDataType';

type PollDescriptionTextAreaProps = {
    pollData: PollDataType;
    setPollData: React.Dispatch<React.SetStateAction<PollDataType>>;
};

export default function PollDescriptionTextArea({
    pollData,
    setPollData,
}: PollDescriptionTextAreaProps) {
    const { description } = pollData;

    const [textareaRows, setTextareaRows] = useState(1);

    const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaRows(textarea.rows);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPollData((prevData: PollDataType) => ({
            ...prevData,
            description: event.target.value,
        }));

        autoResizeTextarea(event.target);
    };

    return (
        <div className="relative z-0">
            <textarea
                rows={textareaRows}
                autoComplete="off"
                id="newPost"
                name="newPost"
                className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer overflow-hidden resize-none"
                placeholder=" "
                value={description}
                onChange={handleDescriptionChange}
            />
            <label
                htmlFor="newPost"
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                Further description
            </label>
            <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden"></div>
        </div>
    );
}
