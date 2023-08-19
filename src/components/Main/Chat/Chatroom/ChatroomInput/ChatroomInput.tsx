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
        <div className="flex mt-4 mx-4 gap-4 sticky bottom-4 right-40 z-0">
            <input
                type="text"
                name="chatInput"
                value={inputMessage}
                autoComplete="off"
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder=" "
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <label
                htmlFor="chatInput"
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Enter a message...
            </label>
            <div className="absolute left-0 bottom-0 w-11/12 h-0.5 overflow-hidden">
                <div
                    className={`h-full mr-12 ${
                        isInputFocused
                            ? 'bg-cPink'
                            : 'bg-gradient-to-r from-cGreen via-yellow-300 to-cBlue animate-gradientBorderAnimation'
                    } `}
                />
            </div>
            <button
                disabled={isSubmitting}
                onClick={sendMessage}
                className={`flex items-center justify-center w-24 rounded-full text-regularTextDark ml-auto text-sm ${
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
