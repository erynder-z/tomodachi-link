import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';

type ChatroomInputProps = {
    inputMessage: string;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    onTyping: () => void;
};

export default function ChatroomInput({
    inputMessage,
    setInputMessage,
    sendMessage,
    onTyping,
}: ChatroomInputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
        onTyping();
    };

    return (
        <div className="flex mt-4 mx-4 gap-4 relative z-0">
            <input
                type="text"
                name="chatInput"
                value={inputMessage}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder=" "
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <label
                htmlFor="chatInput"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Enter a message...
            </label>
            <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden">
                <div
                    className={`h-full mr-12 ${
                        isInputFocused
                            ? 'bg-cPink'
                            : 'bg-gradient-to-r from-cGreen via-yellow-300 to-cBlue animate-gradientBorderAnimation'
                    } `}
                />
            </div>
            <button
                onClick={sendMessage}
                className={`flex items-center justify-center  w-12 text-white ml-auto text-sm ${
                    !inputMessage
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title={inputMessage ? undefined : 'Please enter a message'}
            >
                <MdSend />
            </button>
        </div>
    );
}
