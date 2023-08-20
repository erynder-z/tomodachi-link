import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';

type ChatroomInputProps = {
    inputMessage: string;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    onTyping: () => void;
    isSubmitting: boolean;
};

export default function ChatroomInput({
    inputMessage,
    setInputMessage,
    sendMessage,
    onTyping,
    isSubmitting,
}: ChatroomInputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
        onTyping();
    };

    return (
        <div className="flex sticky bottom-4 right-40 z-0 bg-card dark:bg-cardDark h-12">
            <div className="flex justify-end flex-col w-full ">
                <input
                    type="text"
                    name="chatInput"
                    value={inputMessage}
                    autoComplete="off"
                    onChange={handleInputChange}
                    className="py-2.5 px-4 text-sm  text-regularText dark:text-regularTextDark bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />
                <label
                    htmlFor="chatInput"
                    className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-focus:left-0 peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-4 -z-10 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
                >
                    Enter a message...
                </label>
                <div className="w-full h-0.5 overflow-hidden">
                    <div
                        className={`h-full w-full  ${
                            isInputFocused
                                ? 'bg-highlight dark:bg-highlightDark'
                                : 'bg-gradient-to-r from-cGreen via-yellow-300 to-cBlue animate-gradientBorderAnimation'
                        } `}
                    />
                </div>
            </div>
            <button
                disabled={isSubmitting}
                onClick={sendMessage}
                className={`flex items-center justify-center w-24 h-full  text-regularTextDark text-sm ${
                    !inputMessage
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
                }`}
                title={inputMessage ? undefined : 'Please enter a message'}
            >
                {isSubmitting ? <ButtonBusy /> : <MdSend size="1.5em" />}
            </button>
        </div>
    );
}
