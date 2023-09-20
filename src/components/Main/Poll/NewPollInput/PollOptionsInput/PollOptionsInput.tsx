import React from 'react';
import { PollDataType } from '../../../../../types/pollDataType';

type PollOptionsInputProps = {
    pollData: PollDataType;
    handlePollOptionInputChange: (index: number, value: string) => void;
};

export default function PollOptionsInput({
    pollData,
    handlePollOptionInputChange,
}: PollOptionsInputProps) {
    const { numberOfOptions, options } = pollData;

    const optionElements = [];

    for (let i = 0; i <= numberOfOptions - 1; i++) {
        optionElements.push(
            <div key={i} className="relative z-0">
                <input
                    required
                    autoComplete="off"
                    id={`pollOption${i}`}
                    name={`pollOption${i}`}
                    className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
                    placeholder=" "
                    value={options[i]}
                    onChange={(e) =>
                        handlePollOptionInputChange(i, e.target.value)
                    }
                />
                <label
                    htmlFor={`pollOption${i}`}
                    className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
                >
                    Option {i + 1}
                </label>
                <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden"></div>
            </div>
        );
    }

    return <div className="flex flex-col gap-4">{optionElements}</div>;
}
